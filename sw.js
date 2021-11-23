

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installation');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Mise en cache globale: app shell et contenu');
        return cache.addAll(contentToCache);
      })
    );
});

var gamesImages = [];

var contentToCache = appShellFiles.concat(gamesImages);

var cacheName = 'ginkobus-v1';
var appShellFiles = [
  '',
  'index.html',
  'app.js',
  'style.css',
  'favicon.ico',
  'icons/icon-32.png',
  'icons/icon-64.png',
  'icons/icon-96.png',
  'icons/icon-128.png',
  'icons/icon-168.png',
  'icons/icon-192.png',
  'icons/icon-256.png',
  'icons/maskable_icon.png',
  'icons/icon-512.png'
];

self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Ressource récupérée '+e.request.url);
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Récupération de la ressource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Mise en cache de la nouvelle ressource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });
  contentToCache.push('icons/icon-32.png');
  self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('js13kPWA-v2').then((cache) => {
        return cache.addAll(contentToCache);
      })
    );
  });
  self.addEventListener('activate', (e) => {
    e.waitUntil(
      caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
          if(cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });
  