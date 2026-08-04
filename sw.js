const CACHE_NAME = 'zemusippan-pwa-v2'; // Kategori 5.2: Versiyon güncellendi
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './config.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('ZEMU SIPPAN PWA: Dosyalar önbelleğe alınıyor...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('ZEMU SIPPAN PWA: Eski önbellek temizleniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Kategori 5.2: Stale-While-Revalidate Mimarisi
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchedResponse = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
           console.log("Offline mode - network request failed");
        });

        // Eğer önbellekte varsa hemen onu dön, arka planda network'ten çekip önbelleği güncelle
        // Eğer önbellekte yoksa, fetch işlemini bekle
        return cachedResponse || fetchedResponse;
      });
    })
  );
});
