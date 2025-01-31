import './App.css'
import { useState, useEffect } from 'react';
import { fetchAllPokemon } from './api'
import { fetchPokemonById } from './api';

function App() {

  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function getPoke() {
      try {const response = await fetchAllPokemon();
        setPokemons(response);
      }
        catch {console.error();
        }
      } getPoke()
  }, []); 






  return (
    <>
<div>
  <h1>world wide pokedex</h1>
  <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
    Lets Go!
  </button>
</div>
<div>
  {pokemons.map((pokemon) =>(
    <div key={pokemon.id} >
    </div>
  ))}
</div>

    </>
  )
}

export default App
