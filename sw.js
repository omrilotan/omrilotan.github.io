(() => {
	const version = new URL(location).searchParams.get("ck");

	if (!version) {
		return;
	}

	const cacheKey = `cache-key-${version}`;

	const CACHED_FILES = ["/", "/index.html"];

	// Marks that the page reported running as an installed app.
	// Kept in cache storage because worker globals do not survive restarts.
	const INSTALLED_MARKER = "/__installed__";

	const isInstalled = () =>
		caches
			.open(cacheKey)
			.then((cache) => cache.match(INSTALLED_MARKER))
			.then(Boolean);

	self.addEventListener("install", (event) =>
		event.waitUntil(
			caches
				.open(cacheKey)
				.then((cache) => cache.addAll(CACHED_FILES))
				.then(() => self.skipWaiting()),
		),
	);

	self.addEventListener("activate", (event) =>
		event.waitUntil(
			caches
				.keys()
				.then((keys) =>
					Promise.all(
						keys
							.filter((key) => key !== cacheKey)
							.map((key) => caches.delete(key)),
					),
				)
				.then(() => self.clients.claim()),
		),
	);

	self.addEventListener("message", (event) =>
		event.waitUntil(
			caches
				.open(cacheKey)
				.then((cache) =>
					event.data?.installed
						? cache.put(INSTALLED_MARKER, new Response("1"))
						: cache.delete(INSTALLED_MARKER),
				),
		),
	);

	// Browser: network only, so files never get stuck.
	// Installed app: race cache against network, first good response wins.
	// Network always refreshes the cache in the background.
	self.addEventListener("fetch", (event) => {
		const { request } = event;

		if (
			request.method !== "GET" ||
			new URL(request.url).origin !== location.origin
		) {
			return;
		}

		const network = fetch(request, { cache: "no-cache" });

		const fresh = network.then((response) => {
			if (!response.ok) {
				throw response;
			}
			const copy = response.clone();
			event.waitUntil(
				caches.open(cacheKey).then((cache) => cache.put(request, copy)),
			);
			return response;
		});

		// Keep the background update alive after the cache wins the race.
		event.waitUntil(fresh.catch(() => {}));

		const cached = isInstalled().then((installed) =>
			installed
				? caches
						.match(request, { ignoreSearch: request.mode === "navigate" })
						.then((response) => response || Promise.reject())
				: Promise.reject(),
		);

		event.respondWith(
			Promise.any([fresh, cached]).catch(() => network),
		);
	});
})();
