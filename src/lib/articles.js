// Latest Articles — serverless fetch.
//
// Production primary is the same-origin Cloudflare Pages Function at
// /api/articles (see functions/api/articles.js): it reads Substack
// server-side, so the browser never hits Substack's missing CORS headers.
// The other strategies are keyless fallbacks for local `vite dev` (where
// /api/articles does not exist) and for a Pages outage. Every request has
// an AbortController timeout, so the UI can never sit on "Loading..."
// forever the way the old unlimited rss2json -> codetabs -> allorigins
// chain did (rss2json now 403s, corsproxy.io needs an API key, codetabs /
// allorigins time out — all verified 2026-10-29).

export const SUBSTACK_PUBLICATION = 'samirrhashimov'
const SUBSTACK_BASE = `https://${SUBSTACK_PUBLICATION}.substack.com`
const CACHE_KEY = 'portfolio:articles'
const DEFAULT_TIMEOUT_MS = 8000

export const substackArchiveUrl = (limit) =>
  `${SUBSTACK_BASE}/api/v1/archive?sort=new&search=&offset=0&limit=${limit}`

export const substackFeedUrl = () => `${SUBSTACK_BASE}/feed/`

export function normalizeArchiveItem(item) {
  if (!item || typeof item !== 'object') return null
  const canonicalUrl = item.canonical_url || item.link || ''
  const title = item.title || ''
  if (!title || !canonicalUrl) return null
  return {
    id: item.id ?? canonicalUrl,
    title,
    description: item.description || item.subtitle || '',
    post_date: item.post_date || item.pubDate || '',
    canonical_url: canonicalUrl,
    cover_image: item.cover_image || item.thumbnail || item.enclosure?.link || null,
  }
}

function toBlogList(items, limit) {
  if (!Array.isArray(items)) throw new Error('Article payload is not an array')
  const blogs = items.map(normalizeArchiveItem).filter(Boolean).slice(0, limit)
  if (blogs.length === 0) throw new Error('Article payload is empty')
  return blogs
}

// Reader proxies wrap the JSON in prose ("Title: ... Markdown Content: [...]"),
// so take the outermost [...] instead of demanding a bare JSON body.
export function extractJsonArrayText(text) {
  if (typeof text !== 'string') throw new Error('Article payload is not text')
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']')
  if (start === -1 || end <= start) throw new Error('No JSON array in article payload')
  return text.slice(start, end + 1)
}

export function parseArchiveText(text, limit) {
  return toBlogList(JSON.parse(extractJsonArrayText(text)), limit)
}

export function parseRssFeed(xmlText, limit) {
  if (typeof DOMParser === 'undefined') throw new Error('DOMParser unavailable')
  const xml = new DOMParser().parseFromString(xmlText, 'application/xml')
  if (xml.querySelector('parsererror')) throw new Error('Invalid RSS feed')
  const items = Array.from(xml.querySelectorAll('item'))
  if (items.length === 0) throw new Error('Invalid RSS feed')

  return items.slice(0, limit).map((item) => {
    const rawDescription = item.querySelector('description')?.textContent || ''
    const descriptionDocument = new DOMParser().parseFromString(rawDescription, 'text/html')
    const image =
      item.querySelector('enclosure')?.getAttribute('url') ||
      descriptionDocument.querySelector('img')?.src ||
      null
    const blog = normalizeArchiveItem({
      id: item.querySelector('guid')?.textContent,
      title: item.querySelector('title')?.textContent,
      description: descriptionDocument.body.textContent.trim(),
      post_date: item.querySelector('pubDate')?.textContent,
      canonical_url: item.querySelector('link')?.textContent,
      cover_image: image,
    })
    if (!blog) throw new Error('Invalid RSS item')
    return blog
  })
}

async function fetchWithTimeout(fetchImpl, url, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetchImpl(url, { signal: controller.signal })
    if (!response || !response.ok) {
      throw new Error(`Article source failed (${response?.status ?? 'no response'})`)
    }
    return response
  } finally {
    clearTimeout(timer)
  }
}

function buildStrategies(limit) {
  const archive = substackArchiveUrl(limit)
  const feed = substackFeedUrl()
  return [
    {
      name: 'same-origin serverless (/api/articles)',
      url: `/api/articles?limit=${limit}`,
      parse: async (response) => toBlogList(await response.json(), limit),
    },
    {
      name: 'Substack archive via r.jina.ai',
      url: `https://r.jina.ai/${archive}`,
      parse: async (response) => parseArchiveText(await response.text(), limit),
    },
    {
      name: 'Substack archive via allorigins',
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(archive)}`,
      parse: async (response) => parseArchiveText(await response.text(), limit),
    },
    {
      name: 'Substack RSS via codetabs',
      url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(feed)}`,
      parse: async (response) => parseRssFeed(await response.text(), limit),
    },
    {
      name: 'Substack RSS via allorigins',
      url: `https://api.allorigins.win/get?url=${encodeURIComponent(feed)}`,
      parse: async (response) => {
        const data = await response.json()
        if (!data?.contents) throw new Error('Invalid allorigins response')
        return parseRssFeed(data.contents, limit)
      },
    },
  ]
}

function defaultStorage() {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null
  } catch {
    return null
  }
}

function readCache(storage, limit) {
  try {
    const raw = storage?.getItem(`${CACHE_KEY}:${limit}`)
    if (!raw) return null
    const items = JSON.parse(raw)
    return Array.isArray(items) && items.length > 0 ? items : null
  } catch {
    return null
  }
}

function writeCache(storage, limit, items) {
  try {
    storage?.setItem(`${CACHE_KEY}:${limit}`, JSON.stringify(items))
  } catch {
    // Cache is best-effort; storage may be full or blocked.
  }
}

/**
 * Fetch the latest articles. Tries each source with a per-source timeout,
 * returns the last cached list if every source is down, and only rejects
 * when there is nothing to show — so callers always leave the loading state.
 */
export async function fetchArticles(limit = 5, options = {}) {
  const {
    fetchImpl = (...args) => fetch(...args),
    timeoutMs = DEFAULT_TIMEOUT_MS,
    storage = defaultStorage(),
  } = options

  const errors = []
  for (const strategy of buildStrategies(limit)) {
    try {
      const response = await fetchWithTimeout(fetchImpl, strategy.url, timeoutMs)
      const items = await strategy.parse(response)
      writeCache(storage, limit, items)
      return items
    } catch (error) {
      errors.push(`${strategy.name}: ${error?.message || error}`)
    }
  }

  const cached = readCache(storage, limit)
  if (cached) return cached

  throw new Error(`All article sources failed. ${errors.join(' | ')}`)
}
