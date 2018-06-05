console.log('2-async-await.js')
let url = 'https://jsonplaceholder.typicode.com/users'

// Async/Await
// 1. The `await` keyword can only be used inside functions defined with `async`.
// 2. The `await` keyword can only preceed promises.
async function fetchUsers() {
    let fetchPromise = fetch(url)
    let response = await fetchPromise
    let json = await response.json() 
    return json;
}
// Return values from async functions are automatically wrapped in a promise.

// The `async` keyword is required to be able to use the `await` keyword.
// What should have been a value passed to the `.then` callback, is now
// a return value of the expression `await fetch(url)`.

// Any `async` function returns a promise that you can call `.then` and `.catch` on.
fetchUsers()
.then((users) => {
    let first3 = users.slice(0, 3)
    console.log(first3)
})
.catch((err) => {
    console.error(err)
})


// Since `getUsers` returns a Promise, we can use `await` on it.
async function main() {
    // `try-catch` is used to handle potential errors.
    try {
        let users = await fetchUsers()
        let first3 = users.slice(0, 3)
        console.log(first3)
    } catch (err) {
        // any error in the `try` block, will stop execution 
        // immediately and call the `catch` block.
        console.error(err)
    }

    console.log("inside main")
}
main()

console.log("after main")

// Gotcha:
// You cannot use `await` in the global scope. It has to be done
// inside an `async` function.