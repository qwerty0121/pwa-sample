const cacheName = "cache-v1";
const precacheResources = [
  "/",
  "/index.html",
  "/css/style.css",
  "/images/javascript.svg",
  "/images/vite.svg",
  "/js/main.js",
];

self.addEventListener("install", (event) => {
  console.log(`Service worker install event! cacheName: ${cacheName}`);
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("cache add all");
      cache.addAll(precacheResources);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
