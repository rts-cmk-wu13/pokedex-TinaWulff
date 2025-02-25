
let search = window.location.search
let params = new URLSearchParams(search)
console.log(params);
let id = params.get("id")
console.log(id);

const mainElmDetail = document.createElement("main");
const sectionDetail = document.createElement("section");
sectionDetail.classList.add("card-section");

let pokeDescription = fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
.then(response => response.json())
.then((data) => {
    console.log(data)
})




fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    headers: {
        "Accept": "application/json"
    }
})
    .then(response => response.json())
    .then((data) => {
        console.log(data)

        const abilityNamesHTML = data.abilities
            .map(a => `<p class="about-data">${a.ability.name}</p>`)
            .join('');

        sectionDetail.innerHTML =
            `
           <div class= "header">
            <i class="fa-solid fa-arrow-left"></i>
            <h1>${data.name}</h1>
            <p class="poke-id">#${id}</p>
            <img class="pokemon-img" src="${artworkUrl}/${id}.png" alt="${data.name}">
            </div>
           

            <article>
        
            
            <div class="types">
            <p class="type1">${data.types[0].type.name}</p>
            <p class="type2">${data.types[1].type.name}</p>
            </div>
    
            <h3>About</h3>
            
            <div class="about-container">

            <div class="about-container_divider">
            <img class="weight" src="img/weight.png" alt="weight icon">
            <p class="about-data">${data.weight} kg</p>
            </div>
            <p class="about-type">weight</p>
           
           

               <div class="about-container_divider">
            <img class="meassure" src="img/straighten.png" alt="meassure icon">
             <p class="about-data">${data.height} m</p>
             </div>
             <p class="about-type">Height</p>
            

            ${abilityNamesHTML} 
            <p class="about-type">Moves</p>
           
            </div>

            </ul>
            <p class="Poke-description">${pokeDescription.data.flavor_text_entries}</p>

            <h4>Base Stats</h4>
            <div class="baseStats">
            ${data.stats.map(stat => `
                <p class="stats-headline">${stat.stat.name == "attack" ? "ATK" : stat.stat.name == "defense" ? "DFS" : stat.stat.name == "special-attack" ? "SATK" : stat.stat.name == "special-defense" ? "SDEF" : stat.stat.name == "speed" ? "SPD" : stat.stat.name.toUpperCase()}</p>
            <div class="stats-divider"></div>
            <p class="stats-amount">0${stat.base_stat}</p>
            <progress max="300" value="${stat.base_stat}"></progress>

                `).join("")}
            
            </div>
           

            </article>
        
        `






        mainElmDetail.append(sectionDetail);
        document.querySelector("body").append(mainElmDetail);

    });