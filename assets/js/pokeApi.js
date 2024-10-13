const pokeApi = {}

function corvertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.order = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name);
    const [type1] = types;
    pokemon.types = types;
    pokemon.typesPrimary = type1;
    
    return pokemon
}

pokeApi.getPokemons = (offset = 0, limit= 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((details) => Promise.all(details))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error)=> console.error(error))
}

pokeApi.getPokemonsDetails = (pokemon) =>{
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(corvertPokeApiDetailToPokemon)
}