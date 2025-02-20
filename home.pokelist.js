

fetch("https://pokeapi.co/api/v2/pokemon", {
    headers: {
        "Accept": "application/json"
    }
})

    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })