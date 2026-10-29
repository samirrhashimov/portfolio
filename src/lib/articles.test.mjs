import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  fetchArticles,
  normalizeArchiveItem,
  parseArchiveText,
} from './articles.js'

const sampleItem = {
  id: 42,
  title: 'Test yazısı',
  subtitle: 'Qısa təsvir',
  description: 'Qısa təsvir',
  post_date: '2026-10-16T04:20:19.318Z',
  canonical_url: 'https://samirrhashimov.substack.com/p/test',
  cover_image: 'https://example.com/cover.png',
}

describe('normalizeArchiveItem', () => {
  it('maps Substack archive fields to blog card fields', () => {
    assert.deepEqual(normalizeArchiveItem(sampleItem), {
      id: 42,
      title: 'Test yazısı',
      description: 'Qısa təsvir',
      post_date: '2026-10-16T04:20:19.318Z',
      canonical_url: 'https://samirrhashimov.substack.com/p/test',
      cover_image: 'https://example.com/cover.png',
    })
  })

  it('falls back to subtitle and canonical_url id', () => {
    const item = normalizeArchiveItem({
      title: 'Başlıq',
      subtitle: 'Alt başlıq',
      post_date: '2026-01-01T00:00:00.000Z',
      canonical_url: 'https://example.com/p/x',
    })
    assert.equal(item.id, 'https://example.com/p/x')
    assert.equal(item.description, 'Alt başlıq')
  })
})

describe('parseArchiveText', () => {
  it('parses a plain JSON array and respects the limit', () => {
    const items = parseArchiveText(JSON.stringify([sampleItem, sampleItem]), 1)
    assert.equal(items.length, 1)
    assert.equal(items[0].title, 'Test yazısı')
  })

  it('strips a reader-proxy prefix before the JSON array', () => {
    const wrapped = `Title: feed\n\nMarkdown Content: ${JSON.stringify([sampleItem])}`
    const items = parseArchiveText(wrapped, 5)
    assert.equal(items.length, 1)
    assert.equal(items[0].canonical_url, sampleItem.canonical_url)
  })

  it('throws on a payload without a JSON array', () => {
    assert.throws(() => parseArchiveText('<html>error</html>', 5))
  })
})

describe('fetchArticles', () => {
  it('uses the same-origin serverless endpoint first', async () => {
    const seen = []
    const fetchImpl = async (url) => {
      seen.push(String(url))
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify([sampleItem]),
        json: async () => [sampleItem],
      }
    }
    const items = await fetchArticles(5, { fetchImpl, storage: null })
    assert.equal(items.length, 1)
    assert.match(seen[0], /\/api\/articles\?limit=5/)
  })

  it('falls back to the next source when the serverless endpoint fails', async () => {
    const fetchImpl = async (url) => {
      const href = String(url)
      if (href.includes('/api/articles')) throw new Error('404 in local vite dev')
      if (href.includes('r.jina.ai')) {
        return {
          ok: true,
          status: 200,
          text: async () => `Markdown Content: ${JSON.stringify([sampleItem])}`,
          json: async () => { throw new Error('not json') },
        }
      }
      throw new Error(`unexpected ${href}`)
    }
    const items = await fetchArticles(5, { fetchImpl, storage: null })
    assert.equal(items[0].title, 'Test yazısı')
  })

  it('rejects instead of hanging forever when every source fails', async () => {
    const fetchImpl = async () => { throw new Error('network down') }
    await assert.rejects(
      () => fetchArticles(5, { fetchImpl, storage: null, timeoutMs: 50 }),
      /All article sources failed/,
    )
  })

  it('aborts a source that never answers and moves on / fails fast', async () => {
    const fetchImpl = (url, options = {}) => new Promise((_, reject) => {
      options.signal?.addEventListener('abort', () => {
        const err = new Error('aborted')
        err.name = 'AbortError'
        reject(err)
      })
    })
    const started = Date.now()
    await assert.rejects(
      () => fetchArticles(5, { fetchImpl, storage: null, timeoutMs: 30 }),
      /All article sources failed/,
    )
    assert.ok(Date.now() - started < 5000, 'must not hang on Loading...')
  })

  it('returns cached articles when every source fails', async () => {
    const store = new Map()
    const storage = {
      getItem: (k) => store.get(k) ?? null,
      setItem: (k, v) => store.set(k, v),
    }
    const okFetch = async () => ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify([sampleItem]),
      json: async () => [sampleItem],
    })
    await fetchArticles(5, { fetchImpl: okFetch, storage })

    const downFetch = async () => { throw new Error('network down') }
    const items = await fetchArticles(5, { fetchImpl: downFetch, storage, timeoutMs: 20 })
    assert.equal(items.length, 1)
    assert.equal(items[0].title, 'Test yazısı')
  })
})
