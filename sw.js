(() => {
	const cacheKey = new URL(location).searchParams.get('ck');

	if (!cacheKey) { return; }

	const CACHED_FILES = [
		'index.html',
	];

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
		'fetch',
		event => event.respondWith(
			caches.match(event.request).then(
				response => response || fetch(event.request)
			)
		)
	);
})();
