import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

function Finder({ texto, foundPokemon }) {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  async function getPokemonData() {
    if (nombre.trim() === "") {
      setError("Por favor ingresa el nombre del Pokémon.");
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokémon no encontrado.");
      }

      const data = await response.json();
      foundPokemon(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <View>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
        placeholder="Nombre del Pokémon"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <Button title={texto} onPress={getPokemonData} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
}

export default Finder;
