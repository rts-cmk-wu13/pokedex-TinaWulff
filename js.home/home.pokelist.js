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
docBody.append(mainElm)
let currentOffset = 0;

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if(entry.isIntersecting) {
            console.log("juhuuuu")

            currentOffset = currentOffset + 50
            if (currentOffset > 1304) {
                observer.unobserve(observedPokemon);
            }
    

            fetchPokemon(currentOffset);
        }
    })
})
//, options)



function fetchPokemon(offset) {                           //funktion til at styre hvornår der fetches
// Funktion til at hente Pokémon-data
fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`, {
    headers: {
        "Accept": "application/json"
    }
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // Debugging

        // Generer HTML baseret på data
        sectionElm.innerHTML += data.results.map((pokemon) => {
            const id = getIdFromPokemon(pokemon.url);      // Bruger funktionen til at hente ID
            
            let formattedId = String(id).padStart(3, "0"); // Gør ID 3-cifret

            return `
                <a href="details.pokemon.html?id=${id}">   
                <article class="poke_card">
                    <h3>#${formattedId}</h3>
                    <div class="card-inside-shadow"></div>
                    <img src="${artworkUrl}/${id}.png" alt="${pokemon.name}">
                    <h2>${pokemon.name}</h2>
                </article>
                </a>
            `;
        }).join("");

        
        console.log(document.querySelector("main"));
        //mainElm.append(sectionElm);
        document.querySelector("main").append(sectionElm);
        //docBody.append(mainElm);            //docBody er deklareret i header-filen

        let observedPokemon = sectionElm.querySelector("a:nth-last-child(5)");
      
        //console.log(observedPokemon);
        observer.observe(observedPokemon);
    })
    .catch((error) => {
        console.error("Der opstod en fejl:", error);
    });

}

fetchPokemon(currentOffset);