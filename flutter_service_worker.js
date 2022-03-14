'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "8a18040fa36daa5bdbad81ecbafc0854",
"splash/img/light-2x.png": "7380207ee2c08983a4f445a9cfc0f44b",
"splash/img/dark-4x.png": "cc0bb57ab9a25f59a157a0baeabda3e6",
"splash/img/light-3x.png": "84b9eb2a84da31653e92e0a12f76106e",
"splash/img/dark-3x.png": "84b9eb2a84da31653e92e0a12f76106e",
"splash/img/light-4x.png": "cc0bb57ab9a25f59a157a0baeabda3e6",
"splash/img/dark-2x.png": "7380207ee2c08983a4f445a9cfc0f44b",
"splash/img/dark-1x.png": "b54aa04bc68818b19de5618c9a7d0a97",
"splash/img/light-1x.png": "b54aa04bc68818b19de5618c9a7d0a97",
"splash/splash.js": "c6a271349a0cd249bdb6d3c4d12f5dcf",
"splash/style.css": "7bbbdecdc61596aadb17f5e5beb73146",
"index.html": "7d7ece4875489d1a282ecf1729301b8e",
"/": "7d7ece4875489d1a282ecf1729301b8e",
"main.dart.js": "d41ec19865461e2aadee6bee5bba821d",
"favicon.png": "d89cb3de92c8ed03df798293b5fb2276",
"icons/Icon-192.png": "9b04f36e1ef17100b1da8fd60ac0190f",
"icons/Icon-512.png": "2cb8ba42e5980443ce43a00bda8a8b96",
"manifest.json": "d63edd5057d38716d4ce48c78e86c377",
"assets/AssetManifest.json": "e553d6fc29eddacaa3b5ff38f6c2e78c",
"assets/NOTICES": "369edad73b8fe19368f38b52bc19d1e2",
"assets/FontManifest.json": "e8f70485d29c05fc80d383621ad48410",
"assets/fonts/NotoColorEmoji.ttf": "c6d6ceefac9435dedc785b5676641a1b",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/images/close_12px.png": "989ba7eb5c9b7a668b32a6b8e4e24be0",
"assets/assets/images/difficulty/medium_12px.png": "fbdf8c95b98856c90327fc049e99677f",
"assets/assets/images/difficulty/hard_12px.png": "544c066d72493a00a627d318b4def287",
"assets/assets/images/difficulty/easy_12px.png": "9913e5dde5cd87ca824cc88ca8ee3970",
"assets/assets/images/difficulty/insane_12px.png": "4e1f938313e266b1ccd507fd80649ba8",
"assets/assets/images/audio_control/mute_12px.png": "971a3e1dc931566df495dd93a96a35ea",
"assets/assets/images/audio_control/speaker_12px.png": "778000735323163dee9e4c7bdf639cf6",
"assets/assets/images/3rd-place_12px.png": "aab0fbde27ea5db491c9e7c12fb3468c",
"assets/assets/images/2nd-place_12px.png": "9a4921d98690cac82ccf35aeb28a0e38",
"assets/assets/images/launcher.png": "cc07232ea1b46d7fc4041903e354e4ae",
"assets/assets/images/back_12px.png": "f8ffa43140e942d7bc9d8938ef45b14d",
"assets/assets/images/stopwatch_12px.png": "c29133a62c8c0b92e0ea138dde169b08",
"assets/assets/images/1st-place_12px.png": "9812fc7810492c4be05fa91fdd67d700",
"assets/assets/images/user_12px.png": "d1970eadca6a02c67e1101178a419311",
"assets/assets/images/up-arrow_12px.png": "449baaf4af069aeb56a89e429fa55a5c",
"assets/assets/images/trophy_12px.png": "08872005490556e66668874bbc2efe7e",
"assets/assets/images/pixel_bg.png": "55db831a8b128d538730b2832c689622",
"assets/assets/images/facebook_icon.png": "284d2a1d2782e5e24b1f9bce25f3ea9a",
"assets/assets/images/twitter_icon.png": "f9a8b83fc280f6a6363783cdbdd81573",
"assets/assets/audio/tile_move.mp3": "4b7c65897b1994b844aacbf5f7d33889",
"assets/assets/audio/shuffle.mp3": "1a5feb1d139c225866b6c01f5b013653",
"assets/assets/audio/click.mp3": "d6b58e72555059275efc5c2a6f38536f",
"assets/assets/audio/success.mp3": "eb9bb6a0b99983e79e6d96439bf9a9cf",
"assets/assets/lf30_editor_cjc2qppz.json": "871a28bd163d1f1eaccaa29e0987fe2e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
