console.log('3-concurrency.js')

// Think of url as a url of a web server that serves JSON.
let url = './data'

async function fetchJSON(resource) {
    let response = await fetch(`${url}/${resource}.json`)
    let json = await response.json()
    return json;
}

async function main() {
    // We use `console.time` and `console.timeEnd` to measure the time.
    console.time('sequential')
    var users = await fetchJSON(`users`)
    var posts = await fetchJSON(`posts`)
    var todos = await fetchJSON(`todos`)
    console.timeEnd('sequential')

    
    // Due to caching, you'd have to comment the `sequential` code to get
    // more accurate results on the timing measurement.
    console.time('concurrent')
    var usersPromise = fetchJSON(`users`)
    var postsPromise = fetchJSON(`posts`)
    var todosPromise = fetchJSON(`todos`)
    var users = await usersPromise
    var posts = await postsPromise
    var todos = await todosPromise
    console.timeEnd('concurrent')
}
main()

console.log("Hello after main")
