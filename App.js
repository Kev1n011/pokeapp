import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import Finder from './Components/Components/Finder.js';
import PokemonCard from './Components/PokemonCard.js';

export default function App() {
  const [pokemon, setPokemon] = useState(null);

  return (
    <div className="App">
      <Finder texto={"Buscar Pokémon"} foundPokemon={setPokemon} />
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

