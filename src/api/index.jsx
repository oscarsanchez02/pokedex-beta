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

export async function fetchPokemonById(id) {
  try {
    const response = await fetch(`${APIURL}pokemon/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
    const data = await response.json();
    console.log("Fetched Pokémon:", data); // Debugging log
    return data; // Return the single Pokémon object
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null; // Return null to indicate failure
  }
}
