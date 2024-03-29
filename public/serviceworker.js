const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

//Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('Opened Cache');

            return cache.addAll(urlsToCache);
        })
    )
});

//Listen for request
self.addEventListener('fetch', (event) => {
    event.reponseWith(
        cache.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(() => cache.match('offline.html'))
        })
    )
});

//Activate the Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});