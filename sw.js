// KwikMusic Service Worker (update-friendly)
const CACHE_VERSION = 'v3-2025-09-04';
const CACHE_NAME = `kwikmusic-${CACHE_VERSION}`;

// We avoid precaching HTML/JS/CSS to reduce staleness;
// Cache only a couple of small, rarely changing assets.
const PRECACHE = [
  'images/bg.png',
  'images/kwikmusiclogo.png',
  'images/apple-touch-icon.png',
];

// Install: pre-cache minimal assets and activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(PRECACHE);
      } catch (e) {
        // ignore
      } finally {
        // Activate updated SW immediately
        self.skipWaiting();
      }
    })()
  );
});

// Activate: clean old caches and take control of clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null))
      );
      await self.clients.claim();
    })()
  );
});

// Fetch strategies
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Only handle GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Network-first for navigations (HTML) to always get new deployments
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req));
    return;
  }

  // For same-origin static assets: stale-while-revalidate
  if (sameOrigin) {
    event.respondWith(staleWhileRevalidate(req));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Last resort: offline fallback if you add one later
    return new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((resp) => {
      cache.put(request, resp.clone());
      return resp;
    })
    .catch(() => null);
  return cached || networkPromise || fetch(request).catch(() => cached);
}
