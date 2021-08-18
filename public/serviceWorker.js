const version = 1;
let staticName = `staticCache-${version}`;
let dynamicName = `dynamicCache`;
let options  = {
  ignoreSearch: false,
  ignoreMethod: false,
  ignoreVary: false,
}
let assets = ['/', 'index.html', 'styles.css', 'index.js'];
self.addEventListener('install', (ev) => {
  console.log(`Version ${version} installed`);
  // build a cache
  ev.waitUntil(
    caches
    .open(staticName)
    .then((cache) => {
      cache.addAll(assets).then(
        () => {
          //addAll == fetch() + put()
          console.log(`${staticName} has been updated.`);
        },
        (err) => {
          console.warn(`failed to update ${staticName}.`);
        }
      );
    })
  );
})
self.addEventListener('activate', (ev) => {
  console.log('activated');

  ev.waitUntil(
  caches.keys().then((keys) => {
    return Promise.all(
      keys
        .filter((key) => {
          if (key != staticName) {
            return true;
          }
        })
        .map((key) => caches.delete(key))
    ).then((empties) => {
      //empties is an Array of boolean values.
      //one for each cache deleted
    });
  })
  );
})
self.addEventListener('fetch', (ev) => {
  console.log(`Fetch request for: ${ev.request.url}`);

  ev.respondWith(
    caches.match(ev.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(ev.request).then((fetchResponse) => {
          let type = fetchResponse.headers.get('content-type');
          if (
            (type && type.match(/^text\/css/i)) ||
            ev.request.url.match(/fonts.googleapis.com/i)
          ) {
            //css to save in dynamic cache
            console.log(`save a CSS file ${ev.request.url}`);
            return caches.open(dynamicName).then((cache) => {
              cache.put(ev.request, fetchResponse.clone());
              return fetchResponse;
            });
          } else if (type && type.match(/^html\//i)) {
            console.log(`save an html file ${ev.request.url}`);
            return caches.open(dynamicName).then((cache) => {
              cache.put(ev.request, fetchResponse.clone());
              return fetchResponse;
            });
          } else {
            //save in dynamic cache
            console.log(`OTHER save ${ev.request.url}`);
            return caches.open(dynamicName).then((cache) => {
              cache.put(ev.request, fetchResponse.clone());
              return fetchResponse;
            });
          }
        })
      );
    })
  );
})
self.addEventListener('message', (e) => {
  console.log('installed');
})