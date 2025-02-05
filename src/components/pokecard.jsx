import { useState, useEffect } from "react";
import { fetchPokemoninfo } from "../api";

export default function Pokecard() {
  const [pokemons, setPokemons] = useState([]);
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {" "}
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
              {" "}
              <h2 className="text-2xl font-bold capitalize mb-4">
                {pokemon.name}
              </h2>{" "}
              <img
                className="w-32 h-32 mx-auto mb-4"
                src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
                alt={pokemon.name}
              />{" "}
              <p className="text-xl text-gray-700">ID: {pokemon.id}</p>{" "}
            </div>
          );
        })
      )}
    </div>
  );
}
