import { useState } from "react";
import Pokecard from "./Pokecard";


export default function PokeDial({ pokemons }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleScroll = (direction) => {
    setSelectedIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex < pokemons.length - 1 ? prevIndex + 1 : prevIndex;
      } else {
        return prevIndex > 0 ? prevIndex - 1 : prevIndex;
      }
    });
  };

  const handleScrollbarChange = (event) => {
    // Reverse the range value so 0 starts at the top
    setSelectedIndex(pokemons.length - 1 - Number(event.target.value));
  };

  // Adjust visible Pokémon based on the selected index
  let numVisiblePokemons = selectedIndex >= 2 ? 5 : selectedIndex >= 1 ? 4 : 3;

  let startIndex = Math.max(0, selectedIndex - Math.floor(numVisiblePokemons / 2));
  let endIndex = Math.min(startIndex + numVisiblePokemons, pokemons.length);

  const visiblePokemons = pokemons.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col justify-center items-center relative h-[500px] w-[250px]">
      {/* Navigation Buttons */}
      <button
        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => handleScroll("prev")}
        disabled={selectedIndex === 0}
      >
        ▲
      </button>

      {/* Pokémon List with Centered Effect */}
      <div className="relative h-[350px] flex flex-col items-center justify-center">
        {visiblePokemons.map((pokemon, i) => {
          const index = startIndex + i;
          const isSelected = index === selectedIndex;
          const position = i - Math.floor(visiblePokemons.length / 2);

          return (
            <div
              key={pokemon.id}
              className={`absolute transition-all duration-500 flex flex-col items-center justify-center 
                ${isSelected ? "opacity-100 scale-110 z-20 pointer-events-auto" : "opacity-50 scale-90 z-10"}`}
              style={{
                top: `calc(50% + ${position * 60}px)`,
                transform: "translateY(-50%)",
              }}
            >
              <Pokecard pokemon={pokemon} isSelected={isSelected} />
            </div>
          );
        })}
      </div>

      {/* Taller Scrollbar with Reverse Mapping */}
      <input
        type="range"
        min="0"
        max={pokemons.length - 1}
        value={pokemons.length - 1 - selectedIndex} // Reverse direction
        onChange={handleScrollbarChange}
        className="absolute right-[-40px] h-[300px] rotate-[-90deg] cursor-pointer"
      />

      {/* Next Button */}
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