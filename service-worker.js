// هذا الكود في ملف منفصل يسمى service-worker.js
self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/favicon/favicon.ico',
          '/favicon/apple-touch-icon.png',
          // أضف جميع الملفات المهمة التي تريد تخزينها
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        return cachedResponse || fetch(e.request);
      })
    );
  });
  