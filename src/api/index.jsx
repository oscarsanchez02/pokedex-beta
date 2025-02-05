const APIURL = `https://pokeapi.co/api/v2/`;
const MAX_POKEMON = 151;

/* Fetching all Pokémon with detailed info */
export async function fetchPokemoninfo() {
  try {
    const response = await fetch(`${APIURL}pokemon?limit=${MAX_POKEMON}`);
    if (!response.ok) throw new Error("Failed to fetch Pokémon list");

    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        try {
          const res = await fetch(pokemon.url);
          if (!res.ok)
            throw new Error(`Failed to fetch data for ${pokemon.name}`);
          return await res.json();
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
          return null; // Return null for failed requests to avoid breaking `Promise.all`
        }
      })
    );

    // Filter out any failed (null) requests before returning
    return detailedPokemons.filter((pokemon) => pokemon !== null);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return []; // Ensure it returns an empty array in case of failure
  }
}

/**Fetch pokemon by ID */
export async function fetchPokemonById(id) {
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
