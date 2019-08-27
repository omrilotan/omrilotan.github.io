const meta = (name, tag = document.querySelector(`meta[name="${name}"]`)) => tag && tag.getAttribute('content');
const CACHED_FILES = [
	'index.html',
];

(() => {
	const cacheKey = meta('sw-cache-key');
	if (!cacheKey) {
		return;
	}

	self.addEventListener(
		'install',
		event => event.waitUntil(
			caches.open(cacheKey).then(
				cache => cache.addAll(CACHED_FILES)
			).then(
				() => self.skipWaiting()
			)
		)
	);

	self.addEventListener(
		'activate',
		event => event.waitUntil(
			Promise.all(
				caches.keys().then(
					cacheNames => cacheNames.map(
						name => name !== cacheKey && caches.delete(name)
					)
				)
			).then(
				() => self.clients.claim()
			)
		)
	);

	self.addEventListener(
		'fetch',
		event => event.respondWith(
			caches.match(event.request).then(
				response => response || fetch(event.request)
			)
		)
	);
});
