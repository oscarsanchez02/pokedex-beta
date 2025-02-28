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

  const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
  const playCry = () => {
    const cryAudio = new Audio(cryUrl);
    cryAudio.play();
  };

  return (
    <div>
      {" "}
      <div
        className=" jersey-10-regular min-h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <div className="grid grid-cols-2 gap-x-8 p-8">
          <div className=" grid grid-cols-3 text-left text-2xl border-2 border-solid rounded-lg border-yellow-500 inset-shadow-sm inset-shadow-yellow-500 bg-yellow-500/25 p-2">
            <div className="text-2xl col-span-2 underline decoration-dashed capitalize">
              Name:
            </div>
            <p className="capitalize">{pokemon.name}</p>
            <h1 className="text-2xl col-span-2 underline decoration-dashed">
              ID:
            </h1>
            {pokemon.id}
            <p className="text-2xl col-span-2 underline decoration-dashed">
              Height:
            </p>
            {pokemon.height}m
            <p className="text-2xl col-span-2 underline decoration-dashed">
              Weight:
            </p>
            {pokemon.weight}kg
            <p className="text-2xl col-span-2 underline decoration-dashed">
              {" "}
              Base experience:
            </p>{" "}
            {pokemon.base_experience}
          </div>
          <div className="grid grid-cols-3 text-left border-2 border-solid rounded-lg border-yellow-500 inset-shadow-sm inset-shadow-yellow-500 bg-yellow-500/25 p-2 ">
            {" "}
            <h3 className="text-2xl col-span-3 underline decoration-dashed">
              Type:
            </h3>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="w-16 text-center rounded-lg text-lg capitalize"
                style={{ backgroundColor: typeColors[type.type.name] }}
              >
                {" "}
                {type.type.name}
              </span>
            ))}
            <h3 className="text-2xl col-span-3 underline decoration-dashed">
              Abilities:
            </h3>
            {pokemon.abilities.map((abilities, index) => {
              return (
                <span key={index} className="text-lg capitalize">
                  <span>{abilities.ability.name}</span>
                </span>
              );
            })}
            <h3 className="text-2xl col-span-3 underline decoration-dashed">
              Stats:
            </h3>
            {pokemon.stats.map((stat, index) => {
              return (
                <ul key={index} className="text-lg capitalize">
                  <li>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center object-center">
          <button onClick={goToPrevPokemon}>
            <img
              src={left}
              className="transition delay-150 duration-300 ease-in-out hover:-translate-x-5 hover:scale-110"
            />
          </button>
          <div className="text-center">
            {" "}
            <img
              className="w-96 h-96 cursor-pointer"
              onClick={playCry}
              src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
              alt={pokemon.name}
            />{" "}
          </div>
          <button onClick={goToNextPokemon}>
            <img
              src={right}
              className=" transition delay-150 duration-300 ease-in-out hover:translate-x-5 hover:scale-110"
            />
          </button>
        </div>{" "}
        <div className="text-center my-5 border-2 border-solid rounded-lg border-yellow-500 inset-shadow-sm inset-shadow-yellow-500 bg-yellow-500/25 p-2 ">
          <h3 className="text-2xl">Description:</h3>
          <p className=" text-2xl italic">{description.replace(/\f/g, " ")}</p>
        </div>
      </div>
    </div>
  );
}
