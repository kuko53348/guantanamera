// service-worker.js - PWA offline support
const CACHE_NAME = 'fletbox-v2';
// Deployment prefix: a worker's own URL always sits at the app root, so this
// is '/' at the host root and '/repo-name/' on a GitHub Pages project site.
// Hard-coded '/' entries would miss every file under a subpath.
const BASE = new URL('./', self.location).pathname;
// The shipped (baked-in) shell, precached so the app opens with no connection.
// loader.js owns a SEPARATE cache ('fletbox-ota') for downloaded bundles.
const PRECACHE = [BASE, BASE + 'index.html', BASE + 'loader.js', BASE + 'config.json', BASE + 'src/app.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        const urls = PRECACHE;
        
        for (const url of urls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
            } else {
              console.log('🔧 [INSTALL] ⚠️ Not cached: ' + url + ' - status: ' + response.status);
            }
          } catch (err) {
            console.log('🔧 [INSTALL] ❌ Error caching ' + url + ':', err.message);
          }
        }
        
        self.skipWaiting();
      } catch (error) {
        console.error('🔧 [INSTALL] ❌ Fatal error:', error);
      }
    })()
  );
});

self.addEventListener('activate', event => {
  console.log('🔧 [ACTIVATE] Activate event started');
  
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
          if (cacheName !== CACHE_NAME && cacheName !== 'fletbox-ota') {
            await caches.delete(cacheName);
          }
        }
        await self.clients.claim();
      } catch (error) {
        console.error('🔧 [ACTIVATE] ❌ Error:', error);
      }
    })()
  );
});

// Hybrid caching:
//  - Static assets (fonts/icons/images/css): cache-first (they are immutable
//    per release and re-fetched only when missing).
//  - Updatable shell (html/js/json, incl. src/app.js + config.json):
//    network-first so a new release is picked up immediately, falling back to
//    the cache when offline. This is what keeps OTA correct: the service worker
//    must never hand back a stale app.js while online.
// Cross-origin requests (the remote OTA config/bundle) are left to the network.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isStatic = /\.(png|jpe?g|svg|gif|webp|ico|woff2?|ttf|otf|css)$/i.test(url.pathname);

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      if (isStatic) {
        const hit = await cache.match(req);
        if (hit) return hit;
      }

      // A page load that neither the host nor the cache can answer must still
      // boot the app: the router takes the URL from there. Asset requests keep
      // their own failure, because replacing a missing image with a document is
      // how a broken site becomes an undebuggable one.
      const shell = async () => {
        if (req.mode !== 'navigate') return null;
        const cached = await cache.match(BASE + 'index.html');
        if (cached) return cached;
        try {
          const fresh = await fetch(BASE + 'index.html', { cache: 'no-store' });
          return fresh.ok ? fresh : null;
        } catch (err) {
          return null;
        }
      };

      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        if (fresh.ok) {
          cache.put(req, fresh.clone());
          return fresh;
        }
        // GitHub Pages has no SPA rewrite: refreshing /guantanamera/menu answers
        // with its own "Page not found". That is a response, not a thrown error,
        // so a fallback that lives only in the catch below never runs and the
        // app looks broken on exactly the URL a shared link or a reload gives.
        const fallback = await shell();
        return fallback || fresh;
      } catch (err) {
        const cached = await cache.match(req);
        if (cached) return cached;
        const fallback = await shell();
        if (fallback) return fallback;
        return Response.error();
      }
    })()
  );
});
