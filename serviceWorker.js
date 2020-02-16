const staticAssets = [
    './',
    './index.html',
    './serviceWorker.js',
    './js/getLocation.js',
    './launcher-icon-144.png'
];


//https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook
// install all the static assets 
//CSS, images, fonts, JS, templates… basically anything you'd consider static to that "version" of your site.
//These are things that would make your site entirely non-functional if they failed to fetch, things an equivalent native-app would make part of the initial download.
// this 
// (NOT USED HERE - you can wait until the app has installed and add
//furthe relements afterwards - e.g. items for later levels in the game
// that way the actual install process isn't too long)

/*self.addEventListener('install', async event => {
    const cache = await caches.open('static-cache');
    cache.addAll(staticAssets);
});*/


// code adapted from here: https://www.youtube.com/watch?v=87RU7v6Y-bk accessed 28th Dec 2019
self.addEventListener('install',function(event) {
    event.waitUntil(
        caches.open('static-cache')
        .then (cache => {
            return cache.addAll(staticAssets);
        })
    );
});


/*self.addEventListener('activate', event => {
  const currentCaches = ['static-cache'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});*/

self.addEventListener('fetch', event=>{
    event.respondWith(
        caches.match(event.request)
        .then (response => {
            return response || fetch(event.request);
        }
    )
    );
}); 

/*self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    let url = event.request.url.indexOf(self.location.origin) !== -1 ?
      event.request.url.split(`${self.location.origin}/`)[1] :
      event.request.url;
    let isFileCached = $FILES.indexOf(url) !== -1;

    if (isFileCached) {
      event.respondWith(
        caches.open($CACHE_STORE)
          .then(cache => {
            return cache.match(url)
              .then(response => {
                if (response) {
                  return response;
                }
                throw Error('There is not response for such request', url);
              });
          })
          .catch(error => {
            return fetch(event.request);
          })
      );
    }
  }
});
*/
// with a service worker, every request for a URL is passed to the 
// worker instead of being made directly to the server
// that way offline situations can be handled more easily
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    // if the request orginates from the same url as the app then 
    // check cache first
    // nb - note that location.url = self.location.url = window.location.url
    // can reverse this situation to check the network first 
    // and only use the local cache if the network is not available
    if (url.origin === location.url) {
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}