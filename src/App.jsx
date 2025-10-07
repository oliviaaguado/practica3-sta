// useEffect permite ejecutar código cuando el componente se carga (donde se hacen las peticiones a la API)
// useState permite guardar datos o variables que cambian con el tiempo
import { useEffect, useState } from 'react';
import './App.css';
import Category from "./components/category";   // ⬅️ usa el Category
// Si tu Category está en otra ruta, ajusta el import

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [actores, setActores] = useState([]);
  const [categorias, setCategorias] = useState([]); // ⬅️ aquí guardamos los grupos

  useEffect(() => {
    // Llamada a la API para obtener las películas
    fetch("http://localhost:3000/peliculas")
      .then((res) => res.json())
      .then((data) => {
        setPeliculas(data);

        // ======= AGRUPAR POR CATEGORÍA/GENERO =======
        // Usamos la propiedad 'categoria' si existe; si no, probamos 'genero'; si no, 'Todas'
        const grupos = data.reduce((acc, p) => {
          const key = p.categoria || p.genero || "Todas";
          if (!acc[key]) acc[key] = [];
          // Normaliza mínimamente campos que Category/Pelicula esperan
          acc[key].push({
            id: p.id,
            titulo: p.titulo || p.nombre || p.title,
            director: p.director,
            anio: p.anio || p.year,
            actores: p.actores,    // por si tu Pelicula lo usa
            ...p                   // conserva el resto de campos
          });
          return acc;
        }, {});

        // Array [{ title, movies }]
        const cats = Object.entries(grupos).map(([title, movies]) => ({ title, movies }));
        setCategorias(cats);
      })
      .catch((err) => console.error("Error al cargar películas", err));

    // Llamada a la API para obtener los actores
    fetch("http://localhost:3000/actores")
      .then(res => res.json())
      .then(data => setActores(data))
      .catch(err => console.error("Error al cargar actores", err));
  }, []);

  return (
    <div className="App">
      <h1>🎥 Catálogo de Películas</h1>

      {categorias.length === 0 ? (
        <p>Cargando películas...</p>
      ) : (
        // Pintamos UNA categoría por grupo (con carrusel horizontal)
        categorias.map(cat => (
          <Category
            key={cat.title}
            title={cat.title}
            movies={cat.movies}
            actores={actores}    // ⬅️ pásalo para que llegue a <Pelicula />
          />
        ))
      )}
    </div>
  );
}

export default App;
