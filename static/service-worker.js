const CACHE_STATIC = 'static-cache-v1';
const CACHE_DYNAMIC = 'dynamic-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/offline.html',
  '/main.js',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
]; //this array of files is cached on initial install

self.addEventListener('install', event => {
  //console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      //console.log('[Service Worker] PreCaching app shell ...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  //console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
            //console.log('[Service Worker] removing old cache', key);
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
        return fetch(event.request)
          .then(res => {
            return caches.open(CACHE_DYNAMIC).then(cache => {
              cache
                .put(event.request.url, res.clone())
                .catch(e => console.log('caching error still unknown fix'));
              return res;
            });
          })
          .catch(err => {
            return caches.open(CACHE_STATIC).then(cache => {
              return cache.match('/offline.html');
            });
          });
      }
    })
  );
});

self.addEventListener('push', event => {
  console.log('push notification received', event);
  let data = {};
  if (event.data) {
    data = JSON.parse(event.data.text());
  }
  const options = {
    body: data.content,
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
