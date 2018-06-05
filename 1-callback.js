console.log('1-callback.js')
let url = 'https://jsonplaceholder.typicode.com/users'

// Fetch using a callback function
function fetchUsers(callback) {
    fetch(url)
    .then((response) => {
        // To chain another `.then` we must return a promise.
        // Here, response.json() is a function that returns a promise.
        return response.json();
    })
    .then((json) => {
        callback(null, json);
    })
    .catch((err) => {
        callback(err, null)
    })
}

fetchUsers((err, users) => {
    if (err) {
        console.error(err)
        return;
    }
    let first3 = users.slice(0, 3)
    console.log(first3);
})


console.log("Line: 30")