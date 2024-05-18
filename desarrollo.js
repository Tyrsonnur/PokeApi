function listaPokemon(url_pokeapi = 'https://pokeapi.co/api/v2/pokemon') {

    let divPokemon = document.querySelector("#grilla-pokemon")
    let dataAPI_pokeapi = fetch(url_pokeapi)
    dataAPI_pokeapi.then(respuestaPromesa => respuestaPromesa.json())
        .then(infojson => {
            infojson.results.forEach(pokemon => {
                let urlPokemon = pokemon.url
                let consumoPokemon = fetch(urlPokemon)
                consumoPokemon.then(respuestaPromesa => respuestaPromesa.json())
                    .then(infoPokemon => {
                        let infoTipo = ""
                        infoPokemon.types.forEach(element => {
                            infoTipo += `<li>${element.type.name}</li>`
                        });

                        let estadisticas = ` `
                        infoPokemon.stats.forEach(dataStats => {
                            if (dataStats.stat.name == 'hp') {
                                estadisticas += `<div> vida: <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${dataStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar bg-success" style="width: ${dataStats.base_stat}%">${dataStats.base_stat}/100</div></div>`
                            } else if (dataStats.stat.name == 'attack') {
                                estadisticas += `<div> ataque: <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${dataStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar bg-danger" style="width: ${dataStats.base_stat}%">${dataStats.base_stat}/100</div></div>`
                            } else if (dataStats.stat.name == 'defense') {
                                estadisticas += `<div> defensa: <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${dataStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar bg-primary" style="width: ${dataStats.base_stat}%">${dataStats.base_stat}/100</div></div>`
                            }
                        })

                        divPokemon.innerHTML += `
                        <div class="card mx-2 mt-2" style="width: 20%">
                        <img src="${infoPokemon.sprites.front_default}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title fw-bold">${pokemon.name}</h5>
                            <ul class="ps-2 listaStats">
                                <li class="fw-bold"> Tipo: ${infoTipo} </li>
                                <li class="fw-bold"> Peso: ${infoPokemon.weight} Kg. </li>
                                <li class="fw-bold"> Altura: ${infoPokemon.height} cm.</li>
                                <li class="fw-bold"> XP Base: ${infoPokemon.base_experience} </li>
                                </ul>
                                <div class=" cuadroStats"> ${estadisticas} </div>
                            </div>
                            </div>
                            `
                    })
            });
            boton_siguiente.setAttribute(`data-url-pokemon`, infojson.next)
            boton_anterior.setAttribute(`data-url-pokemon`, infojson.previous)

        }).catch(error => {
            console.log(error)
        })

}
listaPokemon()
paginaPokemones()

async function GetPkmn() {
    let url_pokeapi = 'https://pokeapi.co/api/v2/pokemon'
    let dataAPI_pokeapi = await fetch(url_pokeapi)
    let infojson = await dataAPI_pokeapi.json()


    for (const pokemon of infojson.results) {
        let poke = await fetch(pokemon.url)
        let pokedara = await infojson()
        console.log(pokedara, poke)
        return infojson.results
    }
}

//cambiar_pagina_siguiente()

function paginaPokemones() {
    let boton_siguiente = document.querySelector("#btn_siguiente")
    let boton_anterior = document.querySelector("#btn_anterior")

    boton_siguiente.setAttribute('data-url-pokemon', 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
    boton_anterior.setAttribute('data-url-pokemon', '')

    boton_siguiente.addEventListener('click', function (disparador) {
        let P2 = disparador.target.getAttribute('data-url-pokemon')
        if (P2 != null) {
            listaPokemon(P2)
        }
    })

    boton_anterior.addEventListener('click', function (disparador) {
        let P2 = disparador.target.getAttribute('data-url-pokemon')
        if (P2 != null) {
            listaPokemon(P2)
        }
    })
}


