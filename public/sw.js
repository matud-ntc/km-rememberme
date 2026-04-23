const CACHE = 'rememberme-v1'
const STATIC = [
  '/',
  '/supermercado',
  '/hogar',
  '/historial',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(STATIC)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  if (e.request.url.includes('/api/') || e.request.url.includes('_next/')) {
    // Network first for Next.js internals and API
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    )
    return
  }
  // Network first, cache fallback for pages
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone()
        caches.open(CACHE).then((c) => c.put(e.request, clone))
        return res
      })
      .catch(() => caches.match(e.request))
  )
})
