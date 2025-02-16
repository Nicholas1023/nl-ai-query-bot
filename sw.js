const CACHE_NAME = "NL_AI_Query_Bot";
const FILES_TO_CACHE = [
  "https://Nicholas1023.github.io/nl-ai-query-bot/",
  "https://Nicholas1023.github.io/nl-ai-query-bot/index.html",
  "https://Nicholas1023.github.io/nl-ai-query-bot/style.css",
  "https://Nicholas1023.github.io/nl-ai-query-bot/script.js",
  "https://Nicholas1023.github.io/nl-ai-query-bot/logo.png",
  "https://Nicholas1023.github.io/nl-ai-query-bot/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching files");
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch((error) => {
        console.error("Failed to cache files", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
