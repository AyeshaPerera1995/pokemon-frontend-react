// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function UserList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pokemon')
      .then(response => {
        console.log(response.data)
        setPokemons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="pokemon-list">
      <h1>Pokemon List</h1>
      <div className="grid-container">
        {pokemons.map(pokemon => (
          <div className="pokemon-card" key={pokemon.id}>
            <img src={pokemon.original_image} alt={pokemon.name} className="original-image"/>
            <img src={`http://localhost:5000/api/pokemon/image/${pokemon.silhouette_image}`} alt={pokemon.name} className="silhouette-image"/>
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
