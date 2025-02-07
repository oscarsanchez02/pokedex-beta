import { useState, useEffect } from "react";
import { fetchPokemoninfo } from "../api";
import { useNavigate } from "react-router-dom";

export default function Pokecard() {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPoke() {
      try {
        const response = await fetchPokemoninfo();
        setPokemons(response);
      } catch (error) {
        console.error("Error catching Pokemon:", error);
      }
    }
    getPoke();
  }, []);

  function handleClick(pokemonID) {
    navigate(`/pokemon/${pokemonID}`);  // Navigate to the details page of the selected Pokémon
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {pokemons.length === 0 ? (
        <p>Loading...</p>
      ) : (
        pokemons.map((pokemon, index) => {
          const pokemonID = pokemon.id;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-5 text-center"
            >
              <h2 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h2>
              <img
                className="w-32 h-32 mx-auto mb-4"
                src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
                alt={pokemon.name}
              />
              <p className="text-xl text-gray-700">ID: {pokemon.id}</p>
              <button
                onClick={() => handleClick(pokemon.id)}  // Dynamically pass the Pokémon ID
                className="px-4 py-2 ml-2 dark:bg-yellow-300 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Details
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}