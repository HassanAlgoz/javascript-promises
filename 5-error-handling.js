console.log('5-error-handling.js')

// Array
const urls = [
    './data/albums.json',
    './data/comments.json',
    './data/photos.json',
    './data/posts.json',
    './data/todos.json',
    './data/users.json',
    
    // uncomment the below lines to see more errors
    
    // './some/path/to/throw/an/error.json',
    // './data/incorrect.json',
];

async function fetchJSON(resource) {
    let response = await fetch(resource)
    let json = await response.json()
    return json;
}

// someFunction is used to demonstrate what happens when a function throws an error.
function someFunction() {
    let someCondition = (true == true)
    if (someCondition) {
        throw new Error("an intentional error for testing")
    } 
}

async function concurrent () {
    // someFunction()
    let responses = await Promise.all( urls.map(u => fetch(u)) )
    let results = await Promise.all( responses.map(r => r.json()) )  
    return results;
}

async function main() {
       
    // using .then
    concurrent().then(result => {
        let [albums, comments, photos, posts, todos, users] = result;
    })
    .catch(err => {
        console.error(`could not fetch urls`, err)
    })

    // using async/await
    try {
        let [albums, comments, photos, posts, todos, users] = await concurrent();
    } catch (err) {
        console.error(`could not fetch urls`, err)
    } finally {
        // some cleanup code such as closing an opened file.
    }

}

main()