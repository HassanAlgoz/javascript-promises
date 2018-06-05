console.log('4-promise-all.js')

// Array
const urls = [
    './data/albums.json',
    './data/comments.json',
    './data/photos.json',
    './data/posts.json',
    './data/todos.json',
    './data/users.json'
];

async function fetchJSON(resource) {
    let response = await fetch(resource)
    let json = await response.json()
    return json;
}

// Do this.
async function concurrent () {
    // Map the array of strings (urls) to promises. (note that fetch returns a promise)
    // Then wait when they all resolve (finish), and let that be the value of responses.
    let promises = urls.map(u => fetchJSON(u));
    let results = await Promise.all(promises)
    return results;
}

// Don't do this!.
async function not_concurrent () {
    let results = [];
    for(let i = 0; i < urls.length; i++) {
        let json = await fetchJSON(urls[i]);
        results.push(json)
    }
    return results;
    // The above loop will wait everytime it sees the `await` keyword.
    // If you want concurrent execution, then, this is wrong!
}
