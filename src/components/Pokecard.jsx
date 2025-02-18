import { useNavigate } from "react-router-dom";

export default function Pokecard({ pokemon, isSelected }) {
  const navigate = useNavigate();

  function handleClick(pokemonID) {
    if (isSelected) {
      navigate(`/pokemon/${pokemonID}`);
    }
  }

  return (
    <div
      className={`flex items-center bg-amber-400 rounded-lg shadow-lg p-4 w-100 
      ${isSelected ? "cursor-pointer hover:bg-gray-200" : "opacity-50 cursor-not-allowed"}`}
      onClick={() => handleClick(pokemon.id)}
    >
      <img className="w-20 h-20 object-contain" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} />
      <div className="ml-4">
        <p className="text-gray-700 font-bold text-lg">#{pokemon.id}</p>
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
      </div>
    </div>
  );
}