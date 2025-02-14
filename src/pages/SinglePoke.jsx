import { useState, useEffect } from "react";
import { fetchPokemonById } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export default function SinglePoke() {
  const { pokemonID } = useParams(); // Get pokemonID from the URL
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState(""); // New state to store the description
  const navigate = useNavigate();


  useEffect(() => {
    async function getPokemon() {
      const data = await fetchPokemonById(pokemonID);
      setPokemon(data);

      // Fetching the species information for the description
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();

      // Extracting the first flavor text entry
      const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
      setDescription(flavorText ? flavorText.flavor_text : "No description available.");
    }

    if (pokemonID) {
      getPokemon();
    }
  }, [pokemonID]);

  if (!pokemon) return <p>Loading...</p>;

  // Handler functions for next and previous buttons
  const goToPrevPokemon = () => {
    const prevID = parseInt(pokemonID) - 1;
    if (prevID > 0) {
      navigate(`/pokemon/${prevID}`);
    }
  };

  const goToNextPokemon = () => {
    const nextID = parseInt(pokemonID) + 1;
    navigate(`/pokemon/${nextID}`);
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-5 text-center">
      <h2 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h2>
      <img
        className="w-32 h-32 mx-auto mb-4"
        src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
        alt={pokemon.name}
      />
      <p className="text-xl text-gray-700">ID: {pokemon.id}</p>
      <p>{pokemon.weight}</p>

      {/* Buttons for previous and next */}
      <div className="mb-4">
        <button
          onClick={goToPrevPokemon}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
          onClick={goToNextPokemon}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Description:</h3>
        <p className="text-gray-700 italic">{description.replace(/\f/g, " ")}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Types:</h3>
        <div className="flex justify-center gap-2">
          {" "}
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-4 py-2 text-white rounded-full"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {" "}
              {type.type.name}{" "}
            </span>
          ))}{" "}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Abilities:</h3>
        {pokemon.abilities.map((abilities, index) => {
          return (
            <div key={index}>
              <div>{abilities.ability.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
