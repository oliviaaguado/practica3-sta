import { useState } from 'react';
import "./Pelicula.css";

export default function Pelicula({ pelicula }) {
  return (
    <div className="pelicula">
      <h2 className="nombre">{pelicula.nombre}</h2>
      <button className="boton">Más información</button>
    </div>
  );
}
