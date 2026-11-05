// The site no longer uses a service worker. Browsers that installed the old
// one fetch this file on their next visit: it deletes the old one's caches
// and removes itself. Keep it until old installs have had time to update.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) =>
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key.startsWith("cache-key-"))
						.map((key) => caches.delete(key)),
				),
			)
			.then(() => self.registration.unregister()),
	),
);
