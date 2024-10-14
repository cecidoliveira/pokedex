const pokemonOl = document.getElementById('pokemon-list')
const loadMore = document.getElementById('load-more')
const pokemonModal = document.getElementById('abrirModal')


const maxRecords = 151;
const limit = 10;
let offset = 0;

function renderPokemons(pokemon){
    return `
    <a href="#abrirModal" id="pokemon-info" onClick="handleModal('${pokemon.name}')">
        <li class="pokemon ${pokemon.typesPrimary}">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    </a>
    `
}

function loadPokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        console.log(pokemons)
        const newHtml = pokemons.map(renderPokemons).join('');
        pokemonOl.innerHTML += newHtml;
    }).catch((error)=> console.error(error))
}

loadMore.addEventListener('click', () => {
    offset += limit
    const qtdRecords = offset + limit

    if (qtdRecords >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    } else {
            loadPokemons(offset, limit)

    }

})

loadPokemons(offset,limit)

function renderDetailsPokemons(pokemon){
    return `
    <div id="modal-details" class="${pokemon.typesPrimary}">
        <a href="#fechar" title="Fechar" class="fechar" id="fechar">x</a>
        <div class="content-modal">
            <div class="header-modal">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <div class="header-title-modal">
                    <h2>${pokemon.name}</h2>
                    <h2>#${pokemon.order}</h2>
                </div>
            </div>
                    
            <div class="flex-modal">
                <h4>Types:</h4>
                <div class="info-modal">
                    ${pokemon.types.map((type) => `<p class="${type} types-modal">${type}</p>`).join('')}
                </div>
            </div>
    
            <div class="flex-modal">
                <h4>weight:</h4>
                <div class="info-modal">
                    <p class="info-bg"> ${pokemon.weight/10} kg</p>
                </div>
            </div>
    
            <div class="flex-modal">
                <h4>Abilities:</h4>
                <div class="info-modal">
                    ${pokemon.abilities.map((ability) => ` <p class="info-bg">${ability}</p>`).join('')}
                </div>
            </div>
        </div>
    </div>
    `
}


function handleModal(namePokemon){
    pokeApi.getPokemonsModal(namePokemon).then((pokemon = []) =>{
        const newHtml = renderDetailsPokemons(pokemon);
        pokemonModal.innerHTML = newHtml;
    }).catch((error)=> console.error(error))

}