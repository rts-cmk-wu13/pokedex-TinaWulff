
let search = window.location.search
let params = new URLSearchParams(search)
console.log(params);
let id = params.get("id")
console.log(id);


const mainElmDetail = document.createElement("main");
const sectionDetail = document.createElement("section");
sectionDetail.classList.add("card-section");

let container = sectionDetail

fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(response => response.json())
    .then((pokeDescriptionData) => {
        // Hent beskrivelsen fra Pokémon-species data
        const pokeDescription = pokeDescriptionData.flavor_text_entries
            .find(entry => entry.language.name === "en");


        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)

                let formattedId = String(id).padStart(3, "0"); // Gør ID 3-cifret
                
                const abilityNamesHTML = data.abilities
                    .map(a => `<p class="about-data">${a.ability.name}</p>`)
                    .join('');
            
                 
// COLORS:
        let primaryType = data.types[0].type.name;
        let typeColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${primaryType}`).trim();
    
        console.log("Type Color: ", typeColor)


        //Baggrundsfarve
            document.querySelector("body").style.backgroundColor = typeColor;


                sectionDetail.innerHTML =
                    `
           <div class= "header">
                <a class="back-to-list" href="index.html"><i class="fa-solid fa-arrow-left"></i></a>
                <h1>${data.name}</h1>
                <p class="poke-id">#${formattedId}</p>
                
                
                    <img class="background-hero" src="img/pokeball.png" alt="pokeball background img">

                    <a class="arrow-left" href="http://127.0.0.1:5500/details.pokemon.html?id=${id-1}"><i class="fa-solid fa-chevron-left"></i></a>
                    <img class="pokemon-img" src="${artworkUrl}/${id}.png" alt="${data.name}">
                    <a class="arrow-right" href="http://127.0.0.1:5500/details.pokemon.html?id=${parseInt(id)+1}"><i class="fa-solid fa-chevron-right"></i></a>
            </div>

            <article>
        
            <div class="types">
            <p class="type1">${data.types[0].type.name}</p>
            ${data.types[1]? `<p class="type2">${data.types[1].type.name}</p>` : ""}
            </div>
    
            <h3>About</h3>
            
            <div class="about-container">

            <div>
            <div class="about-container_divider">
            <img class="weight" src="img/weight.png" alt="weight icon">
            <p class="about-data">${(data.weight / 10).toFixed(1).replace('.', ',')}kg</p>
            </div>
            <p class="about-type">Weight</p>
            </div>
           
           <div class="column-line a"></div>

           <div>
            <div class="about-container_divider">
            <img class="meassure" src="img/straighten.png" alt="meassure icon">
             <p class="about-data">${(data.height / 10).toFixed(1).replace('.', ',')} m</p>
             </div>
             <p class="about-type">Height</p>
             </div>
            
            <div class="column-line b"></div>

            <div>
            ${abilityNamesHTML} 
            <p class="about-type">Moves</p>
           </div>

            </div>


            <p class="Poke-description">${pokeDescription?.flavor_text || 'No description available'}</p>

            <h4>Base Stats</h4>
            <div class="baseStats">
            ${data.stats.map(stat => `
                <p class="stats-headline">${stat.stat.name == "attack" ? "ATK" : stat.stat.name == "defense" ? "DFS" : stat.stat.name == "special-attack" ? "SATK" : stat.stat.name == "special-defense" ? "SDEF" : stat.stat.name == "speed" ? "SPD" : stat.stat.name.toUpperCase()}</p>
            <div class="stats-divider"></div>
            <p class="stats-amount">0${stat.base_stat}</p>
            <meter class="stat-meter" max="300" value="${stat.base_stat}"></meter>

                `).join("")}
            
            </div>
           

            </article>
        `

                mainElmDetail.append(sectionDetail);
                document.querySelector("body").append(mainElmDetail);

                // Efter HTML'en er tilføjet, kan vi begynde at ændre baggrundsfarven
        let types = data.types.map(t => t.type.name); // Henter alle typer

//COLORS
      
        // Sæt farve for type1 (første type)
        let type1Color = getComputedStyle(document.documentElement).getPropertyValue(`--color-${types[0]}`).trim();
        let typeElement1 = sectionDetail.querySelector(".type1");
        if (typeElement1) {
            typeElement1.style.backgroundColor = type1Color;
        }

        // Hvis der er en type2, sættes farven for type2
        if (types[1]) {
            let type2Color = getComputedStyle(document.documentElement).getPropertyValue(`--color-${types[1]}`).trim();
            let typeElement2 = sectionDetail.querySelector(".type2");
            if (typeElement2) {
                typeElement2.style.backgroundColor = type2Color;
            }
        }

        // ABOUT-HEADER
        let aboutHeader = sectionDetail.querySelector("h3");
        if (aboutHeader) aboutHeader.style.color = typeColor;
        aboutHeader.style.Color = typeColor;

        let statsHeader = sectionDetail.querySelector("h4");
        if (statsHeader) statsHeader.style.color = typeColor;
        statsHeader.style.Color = typeColor;

          // Meter ændre farven på meter (stats)
          let statMeters = sectionDetail.querySelectorAll("meter");
          statMeters.forEach(meter => {
              meter.style.setProperty("--meter-optimum-value", typeColor);
          });

            });
    });

   