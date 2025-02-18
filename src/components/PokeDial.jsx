import { useState } from "react";
import Pokecard from "./Pokecard";

export default function PokeDial({ pokemons }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Function to navigate through Pokémon
  const handleScroll = (direction) => {
    setSelectedIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex < pokemons.length - 1 ? prevIndex + 1 : prevIndex;
      } else {
        return prevIndex > 0 ? prevIndex - 1 : prevIndex;
      }
    });
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Navigation Buttons */}
      <button
        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => handleScroll("prev")}
        disabled={selectedIndex === 0}
      >
        ▲
      </button>

      {/* Pokémon List with Dial Effect */}
      <div className="relative h-[300px] flex flex-col items-center">
  {pokemons.map((pokemon, index) => {
    const isSelected = index === selectedIndex;
    const isNext = index === selectedIndex + 1;
    const isPrev = index === selectedIndex - 1;

    return (
      <div
        key={pokemon.id}
        className={`absolute transition-all duration-500 ${
          isSelected
            ? "opacity-100 scale-110 z-10 pointer-events-auto"
            : isNext || isPrev
            ? "opacity-50 scale-90 z-0 pointer-events-none"
            : "opacity-20 scale-75 z-0 pointer-events-none"
        }`}
        style={{ top: `${(index - selectedIndex) * 80 + 100}px` }}
      >
        <Pokecard pokemon={pokemon} isSelected={isSelected} />
      </div>
    );
  })}
</div>

      <button
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => handleScroll("next")}
        disabled={selectedIndex === pokemons.length - 1}
      >
        ▼
      </button>
    </div>
  );
}