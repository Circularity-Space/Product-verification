const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v4';
const assets = [
  '/',
  "/404.html",
  "/activate.html",
  "/aframe-ar.js",
  "/demo.html",
  "/details.html",
  "/firebase.js",
  "/home.html",
  "/icon-192x192.png",
  "/icon-256x256.png",
  "/icon-384x384.png",
  "/icon-512x512.png",
  "/index.html",
  "/login.html",
  "/pattern.patt",
  "/postcss.config.js",
  "/privacy.html",
  "/receive.html",
  "/register.html",
  "/scan.html",
  "/scant.html",
  "/setPreference.html",
  "/sign_up.html",
  "/style.css",
  "/sw.js",
  "/tailwind.css",
  "/tailwind.js",
  "/verify.html",
  "/assets/css/activate.css",
  "/assets/css/base.css",
  "/assets/css/cvars.css",
  "/assets/css/details.css",
  "/assets/css/home.css",
  "/assets/css/index.css",
  "/assets/css/login.css",
  "/assets/css/receive.css",
  "/assets/css/scan.css",
  "/assets/css/signup.css",
  "/assets/css/verify.css",
  "/assets/js/detail.js",
  "/assets/js/login.js",
  "/assets/js/scan.js",
  "/assets/js/shared.js",
  "/assets/js/signup.js",
  "/assets/images/colors.jpg",
  "/assets/images/girl.png",
  "/assets/images/home.png",
  "/assets/images/like.svg",
  "/assets/images/mc.jpeg",
  "/assets/images/Nawiri-logo.png",
  "/assets/images/Nawiri-Plant-Limted-Website-Logo.png",
  "/assets/images/orange.png",
  "/assets/images/scan.png",
  "/assets/images/scan.svg",
  "/assets/images/share.svg",
  "/assets/images/this.jpeg",
  "/assets/images/torch.png",
  "/assets/images/verified-animate.svg",
  "/assets/images/virdis1.jpg",
  "/assets/images/virdis2.png",
  "/assets/images/virdismartplain.png",
  "/minified/html5-qrcode.min.js",
  "/videos/5 simple steps to buy online at Nawiri Plant Online Grocery in Nairobi, Kenya.mp4",
  "/videos/5 simple steps to buy online at Nawiri Plant Online Grocery in Nairobi, Kenya.mp4.meta",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener('fetch', evt => {
  if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          })
        });
      }).catch(() => {
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/pages/fallback.html');
        }
      })
    );
  }
});
