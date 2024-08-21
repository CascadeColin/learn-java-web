let guessValue;

// when the submit button is clicked, the value of the input field is stored in the guessValue variable
// selected the HTML form element with `id="generate"`
document.getElementById("generate").addEventListener("submit", function (e) {
    e.preventDefault()

    // gets the value of the input field typed by the user and assigns it to the guessValue variable
    const formData = new FormData(e.target)
    for (var pair of formData.entries()) {
        guessValue = pair[1]
    }

    /* Equivalent to:
        PUT /guess
        Host: localhost:8080
        Content-Type: application/json

        88

        where 88 is the value of the input field and in this case, guessValue = 88
     */
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: guessValue
    }

    // fetches the response from the server by passing in "/guess" and the HTTP request object
    // this is asynchronous, so the code below will continue to run while the fetch is in progress
    // each `.then` clause waits for a response before executing the next block of code
    fetch("/guess", init)
        // "fetches" a response from the server and returns a promise (a placeholder for the value that will be returned)
        // if the response is successful (status code 200), the response is converted to JSON and "returned" for the next `.then` clause
        .then(res => {
            if (res.status === 200 || res.status === 400) {
                return res.json()
            } else {
                return Promise.reject("Bad request")
            }
        })
        // once we receive the JSON response (the value of `return res.json()`, we can access the data and update the HTML
        .then(json => {
            // selects the HTML element with `id="result"` (the <p> tag in this HTML) and updates it to display to the JSON response (the ResponseEntity object in the Spring server code)
            document.getElementById("result").innerHTML = json
        })
        // similar to how try/catch works in Java, this just catches any errors that occur in the fetch
        .catch(console.error)
})