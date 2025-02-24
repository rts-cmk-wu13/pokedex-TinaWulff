/*

/**
 * Extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */
/*
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

*/
//ovenstående ligge i seperat fil

// her begynder selve komponentet

let sectionElm = document.createElement("section");
sectionElm.classList.add("pokedex_section")
let mainElm = document.createElement("main");


// Funktion til at hente Pokémon-data
fetch("https://pokeapi.co/api/v2/pokemon?limit=20", {
    headers: {
        "Accept": "application/json"
    }
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // Debugging

        // Generer HTML baseret på data
        sectionElm.innerHTML = data.results.map((pokemon) => {
            const id = getIdFromPokemon(pokemon.url);      // Bruger funktionen til at hente ID
            return `
                <a href="details.pokemon.html?id=${id}">   
                <article class="poke_card">
                    <h3>#${id}</h3>
                    <div class="card-inside-shadow"></div>
                    <img src="${artworkUrl}/${id}.png" alt="${pokemon.name}">
                    <h2>${pokemon.name}</h2>
                </article>
                </a>
            `;
        }).join("");

        mainElm.append(sectionElm);
        docBody.append(mainElm);            //docBody er deklareret i header-filen
    })
    .catch((error) => {
        console.error("Der opstod en fejl:", error);
    });

