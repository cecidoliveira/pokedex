const pokemonOl = document.getElementById('pokemon-list')
const loadMore = document.getElementById('load-more')
const detailsModal = document.getElementById('pokemon-info')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function renderPokemons(pokemon){
    return `
    <a href="#abrirModal" id="pokemon-info">
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
