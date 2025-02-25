import { useState, useEffect } from "react";
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
      <div>
        <PokeDial pokemons={pokemons} />
      </div>
    </div>
  );
}