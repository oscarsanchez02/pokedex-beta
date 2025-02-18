import { useState, useEffect } from "react";
// import Pokecard from "../components/Pokecard";
import { fetchPokemoninfo } from "../api";
import backgroundImage from "../assets/pxfuel.jpg"; // Import the background image
import PokeDial from "../components/PokeDial";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function getPokemons() {
      try {
        const data = await fetchPokemoninfo();
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }
    getPokemons();
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-4xl p-6 overflow-auto">
        <PokeDial pokemons={pokemons} />
      </div>
    </div>
  );
}