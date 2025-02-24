
let search = window.location.search
let params = new URLSearchParams(search)
console.log(params);
let id = params.get("id")
console.log(id);

const mainElmDetail = document.createElement("main");
const sectionDetail = document.createElement("section");


fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        headers: {
        "Accept": "application/json"
    }
})
    .then(response => response.json())
    .then((data) => {
        
        console.log(data)

        

        

        mainElmDetail.append(sectionDetail);
        document.querySelector("body").append(mainElmDetail);

    });