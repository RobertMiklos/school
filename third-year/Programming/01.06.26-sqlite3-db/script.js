let submit_button = document.getElementById("submit")

submit_button.addEventListener("click", (event) => {
    event.preventDefault()

    let username = document.getElementById("username")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    
    username = username.value
    email = email.value
    password = password.value

    let package = {
        username: username,
        email: email,
        password: password
    }

    fetch("handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(package)
    })

    .then(answerFromServer => answerFromServer.json())
    .then(data => {
        console.log("PHP posila:", data)

        if (data.status === "ok") {
            alert("Data byla uspesne predana php.")
        }
    })
})