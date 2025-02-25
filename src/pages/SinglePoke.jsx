import { useState, useEffect } from "react";
import { fetchPokemonById } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/pxfuel.jpg";
import left from "../assets/chevron_left.svg";
import right from "../assets/chevron_right.svg";

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
      const flavorText = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      setDescription(
        flavorText ? flavorText.flavor_text : "No description available."
      );
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
    <div>
      {" "}
      <div
        className=" min-h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <div className="grid grid-cols-2 gap-x-8 p-8">
          <div className=" text-center text-2xl border-2 border-solid rounded-lg border-yellow-500 inset-shadow-sm inset-shadow-yellow-500 bg-yellow-500/25 p-2">
            <h1 className="capitalize">Name: {pokemon.name}</h1>
            <p>ID: {pokemon.id}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
          {/* Buttons for previous and next */}
          <div className=" text-center border-2 border-solid rounded-lg border-yellow-500 inset-shadow-sm inset-shadow-yellow-500 bg-yellow-500/25 p-2 ">
            {" "}
            <h3 className="text-2xl ">Type:</h3>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-4 text-white rounded-full mx-2"
                style={{ backgroundColor: typeColors[type.type.name] }}
              >
                {" "}
                {type.type.name}
              </span>
            ))}
            <h3 className="text-2xl">Abilities:</h3>
            {pokemon.abilities.map((abilities, index) => {
              return (
                <div key={index} className="text-2xl">
                  <div>{abilities.ability.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center object-center">
          <button onClick={goToPrevPokemon}>
            <img src={left} />
          </button>
          <div className="text-center">
            {" "}
            <img
              className="w-96 h-96 "
              src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
              alt={pokemon.name}
            />{" "}
          </div>
          <button onClick={goToNextPokemon}>
            <img src={right} className="" />
          </button>
        </div>{" "}
        <div className="text-center my-5 border-2 border-solid rounded-lg border-yellow-500 inset-shadow-sm inset-shadow-yellow-500 bg-yellow-500/25 p-2 ">
          <h3 className="text-lg  font-semibold">Description:</h3>
          <p className=" text-gray-700 italic">
            {description.replace(/\f/g, " ")}
          </p>
        </div>
      </div>
    </div>
  );
}
