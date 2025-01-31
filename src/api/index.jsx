const APIURL = `https://pokeapi.co/api/v2/`;
const MAX_POKEMON = 151;


/* Fetching pokemon */
export async function fetchAllPokemon () {
    try {
        const response = await fetch(`${APIURL}pokemon?limit=${MAX_POKEMON}`);
        const result = await response.json();
        console.log(result);
        return result.pokemon;
    } catch (error) {
        console.log('error fetching pokemon', error);
    }
}

/**Fetch pokemon by ID */

export async function fetchPokemonById (id) {
    try {
        const response = await fetch(`${APIURL}pokemon/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

/**export async function fetchSingleItem(id) {
    try {
        const response = await fetch(`${APIURL}/products/${id}`);
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
} */

/*export async function fetchAllItems(){
    try {
        const response = await fetch(`${APIURL}/products`);
        const result = await response.json();
        // console.log('API Response:', result);
        return result;
    } catch (error) {
        console.log('Error fetching items:', error);
    }
}*/