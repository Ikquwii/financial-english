// Service worker — офлайн-кэш для тренажёра (cache-first, кэширует всё загруженное)
const C = 'fineng-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(C).then(c =>
      c.match(e.request).then(hit =>
        hit || fetch(e.request).then(resp => { c.put(e.request, resp.clone()); return resp; })
                                .catch(() => hit)
      )
    )
  );
});
