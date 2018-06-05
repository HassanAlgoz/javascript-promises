console.log('6-promise-race.js')

// wait blocks the thread for `ms` amount of milliseconds.
function wait(ms) {
    // new Promise has two parameters: resolve, and reject, each of which is a
    // callback function. On success, we call resolve(value). On error, we call
    // reject(reason). Where value is what we wish to return, and reason is the
    // error message.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    });
}

async function fetchPhotos(url) {
    let t = Math.random() * 100; 
    await wait(t) // random delay
    
    let response = await fetch(url);
    return {
        url: url,
        photos: await response.json(),
    }
}

// CASE 1: Fetch from two sources, and take the result from the faster.

// Promise.race returns a promise that resolves or rejects as soon as one of the
// promises in the array resolves or rejects, with the value or reason from that promise.
Promise.race([
    fetchPhotos(`./api1/photos.json`),
    fetchPhotos(`./api2/photos.json`)
])
.then(({photos, url}) => {
    console.log(`${url.substring(2, 6)} was faster!`)
    let first2 = photos.slice(0, 2);
    console.log(first2)
})
.catch(console.error)



// CASE 2: Timeout after some threshold
// timeout is much like wait, however, it rejects after some amount of time.
async function timeout(ms) {
    await wait(ms)
    return new Error(`Timeout: ${ms}ms`)
    // Again, the return value here (which is an error) is wrapped in a promise
    // since this is an async function.
}

async function fetchAlbums() {
    let response = await fetch(`./data/albums.json`);
    let json = response.json()
    return json;
}

Promise.race([fetchAlbums(), timeout(100)])
.then(users => {
    let first2 = users.slice(0, 2);
    console.log(first2)
})
.catch(console.error)