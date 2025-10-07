import { useState } from 'react';
import "./Pelicula.css";

export default function Pelicula({ pelicula }) {
  
    // Variable de estado que inicialmente es false, por lo que la primera vez no se mostrará el año de publicación
    const[mostrarInfo, setMostrarInfo] = useState(false);

    // Toma el valor actual de mostrarInfo y lo invierte, y llama a setMostrarInfo con el nuevo valor
    // Cuando el usuario haga clik en el botón se ejecutará esta función
    const toggleInfo = () => {
        setMostrarInfo(!mostrarInfo);
    };
  
  return (
    <div className="pelicula">
      <h2 className="titulo">{pelicula.nombre}</h2>

      {mostrarInfo && (
        <p className="anio">Año de publicación: {pelicula.anioPublicacion}</p>
      )}

      <button className="boton" onClick={toggleInfo}>
        {mostrarInfo ? "Menos información" : "Más información"}
      </button>
    </div>
  );
}
