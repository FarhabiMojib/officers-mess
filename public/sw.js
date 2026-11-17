const CACHE_NAME = 'officers-mess-live-v27';
const APP_SHELL = [
  './',
  './index.html',
  './404.html'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  if (evt.request.method !== 'GET') return;

  const url = new URL(evt.request.url);
  if (
    url.hostname.includes('firebasedatabase.app') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('googleapis.com') ||
    url.pathname.startsWith('/__/')
  ) {
    return;
  }

  evt.respondWith(
    fetch(evt.request, { cache: 'no-store' })
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (networkResponse.type === 'basic' || url.hostname.includes('gstatic.com'))
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(evt.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(evt.request).then((cachedResponse) => {
          return cachedResponse || caches.match('./index.html');
        });
      })
  );
});
