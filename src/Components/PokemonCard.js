import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Curiosidad del Pokémon",
        text: curiosidad,
        icon: "info",
        confirmButtonText: "Entendido"
      });
    } catch (error) {
      console.error("Error al obtener la curiosidad del Pokémon:", error.message);
      // Mostrar un mensaje de error en caso de falla
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener la curiosidad del Pokémon.",
        icon: "error",
        confirmButtonText: "Entendido"
      });
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.nombre} />
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Text>
          <strong>Altura:</strong> {pokemon.height}<br />
          <strong>Peso:</strong> {pokemon.weight}<br />
          <strong>Tipos:</strong> {pokemon.types && pokemon.types.map(tipo => tipo.type.name).join(', ')}<br />
        </Card.Text>
        <Button variant="primary" onClick={verCuriosidad}>Ver</Button>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
