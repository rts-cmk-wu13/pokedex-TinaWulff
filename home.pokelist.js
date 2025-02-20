

fetch("https://pokeapi.co/api/v2/pokemon", {
    headers: {
        "Accept": "application/json"
    }
})

    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })

    .catch((error) => {
        console.error("Der opstod en fejl:", error);
    });

let docBody = document.querySelector("body");

let header = document.createElement("header");      //header created in body

let logoImg = document.createElement("img");        //LOGO IMG created              //To be APPENDED IN HEADER
logoImg.classList.add("logoImg");
logoImg.src = "img/logo.pokeball.svg"
logoImg.alt = "logo";

let logoTitle = document.createElement("h1");    //headline created
logoTitle.innerHTML = "Pokédex";


//APPENDS
header.append(logoImg, logoTitle);
docBody.append(header);






