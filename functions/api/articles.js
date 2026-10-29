// Cloudflare Pages Function — GET /api/articles?limit=5
//
// Serverless, no separate backend: this runs in the same Cloudflare Pages
// deployment as the static site (samirrhashimov.pages.dev). Substack sends
// no Access-Control-Allow-Origin, so the browser cannot read its archive
// API directly; fetching it here, server-side, removes the CORS problem
// instead of relying on third-party CORS proxies (rss2json, codetabs,
// allorigins, corsproxy.io — all dead, key-gated, or timing out).
//
// Returns the upstream archive array as-is; the client normalizes it
// (src/lib/articles.js), so this stays a thin, reliable pass-through.

const SUBSTACK_ARCHIVE =
  'https://samirrhashimov.substack.com/api/v1/archive?sort=new&search=&offset=0&limit='

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

function jsonResponse(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  })
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url)
  const parsed = Number.parseInt(url.searchParams.get('limit') ?? '5', 10)
  const limit = Number.isFinite(parsed) ? Math.min(20, Math.max(1, parsed)) : 5

  try {
    const upstream = await fetch(`${SUBSTACK_ARCHIVE}${limit}`, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'portfolio-articles/1.0 (+https://samirrhashimov.pages.dev)',
      },
      cf: { cacheTtl: 300, cacheEverything: true },
    })
    if (!upstream.ok) {
      return jsonResponse({ error: 'Substack archive unavailable' }, 502)
    }

    const items = await upstream.json()
    if (!Array.isArray(items)) {
      return jsonResponse({ error: 'Invalid Substack archive response' }, 502)
    }

    return jsonResponse(items, 200, {
      'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600',
    })
  } catch {
    return jsonResponse({ error: 'Substack archive unreachable' }, 502)
  }
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}
