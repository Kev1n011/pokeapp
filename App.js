import React, { useState } from 'react';
import { View } from 'react-native';
import Finder from './src/Components/Finder';
import PokemonCard from './src/Components/PokemonCard';

const App = () => {
  const [pokemon, setPokemon] = useState(null);

  const handleFoundPokemon = (pokemonData) => {
    setPokemon(pokemonData);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Finder texto="Buscar" foundPokemon={handleFoundPokemon} />
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </View>
  );
}

export default App;
