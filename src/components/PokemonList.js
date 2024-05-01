import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      getPokemonData()
    }
  }, []);

  const getPokemonData = async () => {
    await axios.get('http://localhost:5000/api/pokemon')
      .then(response => {
        console.log(response.data)
        setPokemons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  const handleGameRestarted = () => {
    getPokemonData()
    setSelectedPokemon(null); // Reset selectedPokemon state
    setButtonsDisabled(false); // Enable buttons
  }

  const handleButtonClick = async (pokemonId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pokemon/id/${pokemonId}`);
      setSelectedPokemon(response.data);
      setButtonsDisabled(true); // Disable buttons after one is clicked
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="pokemon-list">
      <h1>Who's This Pokemon ?</h1> <button className="button" onClick={handleGameRestarted}>Restart</button>
      <div className="grid-container">
        {pokemons.map(pokemon => (
            pokemon.status && ( // if statement        
              <div className="pokemon-card" key={pokemon.id}>
                <img src={`http://localhost:5000/api/pokemon/image/${pokemon.silhouette_image}`} alt={pokemon.name} className="silhouette-image" />
              </div>   
            ) 
        ))}
      </div>

      <div className="button-container">
      {pokemons.map(pokemon => (
         <button key={pokemon.id} className="button" onClick={() => handleButtonClick(pokemon.id)} disabled={buttonsDisabled}>
         {pokemon.name}
        </button>
      ))}
      </div>  

      {/* Correct Pokemon */}
      {selectedPokemon && (
        <div className="selected-pokemon">
          <h1>{selectedPokemon.message}</h1>
          <h3>Correct Answer :</h3>
          <p>True name: {selectedPokemon.name}</p>
          <img src={selectedPokemon.original_image} alt={selectedPokemon.name} className="original-image" />
        </div>
      )}

    </div>
  );  
}

export default PokemonList;
