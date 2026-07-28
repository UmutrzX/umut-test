const CACHE_NAME = 'kartech-pwa-v2'; // Sürümü güncelledik (v2)
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
        console.log('Kartech PWA: Dosyalar önbelleğe alınıyor...');
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
            console.log('Kartech PWA: Eski önbellek temizleniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Yalnızca GET isteklerini işle (Performans güncellemesi)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Stale-while-revalidate stratejisi:
      // Varsa hemen önbelleği (cache) döndür, ancak arka planda yeni veriyi ağdan çek ve önbelleği güncelle.
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
         console.log("Offline mode - returning cache if available");
      });

      // Eğer önbellekte varsa önbelleği ver, yoksa ağı bekle.
      return cachedResponse || fetchPromise;
    })
  );
});
