import { useState } from 'react';
import "./Pelicula.css";

export default function Pelicula({ pelicula, actores }) {
  
    // Variable de estado que inicialmente es false, por lo que la primera vez no se mostrará el año de publicación
    const[mostrarInfo, setMostrarInfo] = useState(false);

    // Toma el valor actual de mostrarInfo y lo invierte, y llama a setMostrarInfo con el nuevo valor
    // Cuando el usuario haga clik en el botón se ejecutará esta función
    const toggleInfo = () => {
        setMostrarInfo(!mostrarInfo);
    };

    // Filtro los actores que pertenecen a esta película
    const actoresPrincipales = actores.filter(actor =>
        pelicula.actores.includes(actor.id)
    );
  
    return (
        <div className="pelicula">
        <h2 className="titulo">{pelicula.nombre}</h2>

      {mostrarInfo && (
        <>
          <p className="anio"><strong>Año de publicación:</strong> {pelicula.anioPublicacion}</p>
          <p className="actores">
            <strong>Actores Principales:</strong>{" "}
            {actoresPrincipales.map(a => a.nombre).join(", ")}
          </p>
        </>
      )}

        <button className="boton" onClick={toggleInfo}>
            {mostrarInfo ? "Menos información" : "Más información"}
        </button>
        </div>
    );
}
