

fetch("https://pokeapi.co/api/v2/pokemon", {
    headers: {
        "Accept": "application/json"
    }
})

    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })

    // .catch((error) => {
    //     console.error("Der opstod en fejl:", error);
    // });

let docBody = document.querySelector("body");

let header = document.createElement("header");      //header created in body

let logoImg = document.createElement("img");        //LOGO IMG created              //To be APPENDED IN HEADER
logoImg.classList.add("logoImg");
logoImg.src = "img/logo.pokeball.svg"
logoImg.alt = "logo";

let logoTitle = document.createElement("h1");    //headline created
logoTitle.classList.add("logoTitle");
logoTitle.innerHTML = "Pokédex";

let searchContainer = document.createElement("div");            //appendes til header
searchContainer.classList.add("searchContainer");

let searchIcon = document.createElement("i");                   // FONTAWSOME icon lup / search
searchIcon.classList.add("fa-solid,fa-magnifying-glass");       //appendes til div searchcontainer

let searchBar = document.createElement("input");                //appendes til div searchcontainer
searchBar.classList.add("searchBar");
searchBar.type = "text";
searchBar.id = "search";
searchBar.placeholder = "Search";

let searchButton = document.createElement("button");            //appendes til div searchcontainer
searchButton.classList.add("searchButton");
searchButton.innerHTML = "#";

//APPENDS
searchContainer.append(searchIcon,searchBar, searchButton);
header.append(searchContainer);

header.append(logoImg, logoTitle);
docBody.append(header);






