// Verifica se o navegador suporta service workers
if ('ServiceWorker' in navigator) {
    navigator.ServiceWorker.register('./serviceworker.js')
      .then(function(resgistration) {
        console.log('Service Worker registrado com sucesso:', resgistration);
      })
      .catch(function(error) {
        console.log('Falha ao registrar Service Worker:', error);
      });
  }
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Retorna a resposta em cache se disponível, caso contrário, faz a requisição para a rede
          return response || fetch(event.request);
        })
    );
  });
  
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('meu-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          // Adicione outros recursos que deseja armazenar em cache
        ]);
      })
    );
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // Remove caches antigos
            return cacheName !== 'meu-cache';
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });