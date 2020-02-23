const CACHE_STATIC = 'static-cache-v1';
const CACHE_DYNAMIC = 'dynamic-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/main.js',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
]; //this array of files is cached on initial install

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      console.log('[Service Worker] PreCaching app shell ...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
            console.log('[Service Worker] removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(res => {
          return caches
            .open(CACHE_DYNAMIC)
            .then(cache => {
              cache.put(event.request.url, res.clone());
              return res;
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    })
  );
});
