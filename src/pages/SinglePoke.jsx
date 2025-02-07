import { useState, useEffect } from "react";
import { fetchPokemonById } from "../api";
import { useParams } from "react-router-dom";

export default function SinglePoke() {
  const { pokemonID } = useParams();  // Get pokemonID from the URL
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      const data = await fetchPokemonById(pokemonID);
      setPokemon(data);
    }
    if (pokemonID) {
      getPokemon();
    }
  }, [pokemonID]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 text-center">
      <h2 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h2>
      <img
        className="w-32 h-32 mx-auto mb-4"
        src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
        alt={pokemon.name}
      />
      <p className="text-xl text-gray-700">ID: {pokemon.id}</p>
    </div>
  );
}