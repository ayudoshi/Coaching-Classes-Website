let form = document.getElementById('form');

form.addEventListener('submit', (event) => {

    const login = {
        email: form[0].value,
        password: form[1].value
    }
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if (res.ok) {
            console.log(`in first then ${res.ok}`);
            return res.json();
        }
        else {
            throw new Error("Something went wrong");
        }
    }).then((data) => {
        alert(data);
    }).catch((error) => {
        alert(error);
    });
    form.reset();

    event.preventDefault();

});
