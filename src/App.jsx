// useEffect permite ejecutar código cuando el componente se carga (donde se hacen las peticiones a la API)
// useState permite guardar datos o variables que cambian con el tiempo
import { useEffect, useState } from 'react';
import './App.css';
import Pelicula from "./components/pelicula";

// App es el componente principal, el que React muestra en pantalla
function App() {
  // useState([]) --> crea un estado para guardar las películas descargadas
  // peliculas --> variable de estado (guardamos la lista de películas que vienen del servidor)
  // setPeliculas --> función que actualiza ese estado
  const [peliculas, setPeliculas] = useState([]);

  // Petición GET a nuestra API
  // Este bloque se ejecuta automáticamente al cargar la página
  useEffect(() => {
    fetch("http://localhost:3000/peliculas")
      .then((res) => res.json())
      // Guarda los datos obtenidos en el estado
      .then((data) => setPeliculas(data))
      .catch((err) => console.error("Error al cargar películas", err));
  }, []);

return (
  <div className="App">
    <h1>🎥 Catálogo de Películas</h1>

    {peliculas.length === 0 ? (
      <p>Cargando películas...</p>
    ) : (
      <div className="peliculas-container">
        {peliculas.map((peli) => (
          <Pelicula key={peli.id} pelicula={peli} />
        ))}
      </div>
    )}
  </div>
);

}

export default App;
