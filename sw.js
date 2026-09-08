const CACHE_NAME = 'zemusippan-pwa-v8'; // v8: UX hissiyat güncellemesi (hızlı geçiş, buton-ripple, FLIP, CSS-native progress)
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './config.js',
  './config-loader.js',
  './config/site.json',
  './config/categories.json',
  './config/projects.json',
  './config/i18n.json',
  './manifest.json',
  './tailwind-fallback.js',
  './images/logo.png',
  './images/Anamenüarkaplan.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(
        // Tek bir dosya başarısız olsa bile kurulum devam eder (addAll gibi tamamen çökmez)
        urlsToCache.map(url => cache.add(url).catch(() => console.warn('ZEMU SIPPAN PWA: Önbelleğe alınamadı:', url)))
      ))
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

// Stale-While-Revalidate + güvenli offline fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Admin panel ve config dosyaları her zaman taze olmalı (network-first)
  if (event.request.url.includes('/admin/') || event.request.url.includes('/config/')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then(r => r || new Response('', { status: 503, statusText: 'Offline' }))
      )
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchedResponse = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Offline: sayfa gezinmelerinde ana sayfayı döndür, diğer isteklerde 503
          if (event.request.mode === 'navigate') return caches.match('./index.html');
          return new Response('', { status: 503, statusText: 'Offline' });
        });

        // Önbellekte varsa hemen dön, arka planda güncelle; yoksa ağı bekler
        return cachedResponse || fetchedResponse;
      });
    })
  );
});
