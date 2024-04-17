import React, { useState } from "react";
import { Row, InputGroup, Form, Button } from "react-bootstrap";
import "./Finder.css"; 

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
    <Row>
      <InputGroup className="mb-3">
        <Form.Control
          className="custom-input" 
          placeholder="Nombre del Pokémon"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={getPokemonData}>
          {texto}
        </Button>
      </InputGroup>
      {error && <p className="mensaje-error">{error}</p>}
    </Row>
  );
}

export default Finder;
