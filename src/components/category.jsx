import Pelicula from "./pelicula";
import "./category.css";

export default function Category({ title, movies, actores }) { // ⬅️ recibe actores
  return (
    <section className="category">
      <h2 className="category__title">{title}</h2>
      <div className="category__row">
        {movies.map(m => (
          <Pelicula
            key={m.id}
            pelicula={m}     // ⬅️ tu componente espera prop "pelicula"
            actores={actores} // ⬅️ se lo pasamos
          />
        ))}
      </div>
    </section>
  );
}
