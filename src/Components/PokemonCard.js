import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";

function PokemonCard({ pokemon }) {
  const [curiosidad, setCuriosidad] = useState(""); // Estado para almacenar la curiosidad del Pokémon

  // Función para obtener la curiosidad del Pokémon desde la PokeAPI
  const obtenerCuriosidad = async () => {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`);
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener la información del Pokémon.");
      }
      const datos = await respuesta.json();
      const descripcion = datos.flavor_text_entries.find(entry => entry.language.name === 'es');
      if (descripcion) {
        return descripcion.flavor_text;
      } else {
        throw new Error("No se encontró una descripción del Pokémon.");
      }
    } catch (error) {
      console.error("Error al obtener la curiosidad del Pokémon:", error.message);
      return "No se pudo obtener la curiosidad del Pokémon.";
    }
  };

  // Función para manejar el clic en el botón "Ver"
  const verCuriosidad = async () => {
    try {
      const curiosidad = await obtenerCuriosidad();
      // Mostrar la curiosidad en un Sweet Alert
      alert("Curiosidad del Pokémon: " + curiosidad);
    } catch (error) {
      console.error("Error al obtener la curiosidad del Pokémon:", error.message);
      // Mostrar un mensaje de error en caso de falla
      alert("Error: No se pudo obtener la curiosidad del Pokémon.");
    }
  };

  return (
    <View style={{ width: 200 }}>
      <Image style={{ width: 200, height: 200 }} source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }} />
      <View>
        <Text>{pokemon.name}</Text>
        <Text>Altura: {pokemon.height}</Text>
        <Text>Peso: {pokemon.weight}</Text>
        <Text>Tipos: {pokemon.types && pokemon.types.map(tipo => tipo.type.name).join(', ')}</Text>
      </View>
      <Button title="Ver" onPress={verCuriosidad} />
    </View>
  );
}

export default PokemonCard;
