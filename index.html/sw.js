var CACHE_NAME = 'pronoskillz-v1';
var urlsToCache = ['/'];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      if(response) return response;
      return fetch(e.request).catch(function(){
        return caches.match('/');
      });
    })
  );
});
