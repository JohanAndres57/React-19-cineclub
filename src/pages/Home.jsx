import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaFilm, FaStar } from 'react-icons/fa';
import Hero from '../components/Hero';
import Card from '../components/Card';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { getLatestMovies } from '../services/moviesApi';

export default function Home() {
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ignore evita guardar datos si el componente se desmontó antes de que llegara la respuesta
    let ignore = false;

    const loadLatest = async () => {
      try {
        const data = await getLatestMovies(3);
        if (!ignore) setLatestMovies(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadLatest();
    return () => {
      ignore = true;
    };
  }, []);

  const handleFavoriteChange = (updated) => {
    setLatestMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  return (
    <div className="space-y-12">
      <title>Inicio | CineClub</title>
      <meta name="description" content="CineClub: tu catálogo personal de películas." />

      <Hero />

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <FaFilm className="mb-4 text-4xl text-yellow-500" aria-hidden="true" />
          <h2 className="mb-2 text-2xl font-bold">Para cinéfilos</h2>
          <p className="mb-4 text-gray-600">
            Encuentra el reparto, los premios y el director de tus películas favoritas.
          </p>
          <Link to="/movies" className="inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
            Explorar catálogo
          </Link>
        </Card>
        <Card bg="bg-yellow-50">
          <FaStar className="mb-4 text-4xl text-yellow-500" aria-hidden="true" />
          <h2 className="mb-2 text-2xl font-bold">Para coleccionistas</h2>
          <p className="mb-4 text-gray-600">
            Agrega nuevas películas a tu colección y marca tus favoritas para tenerlas siempre a mano.
          </p>
          <Link to="/add-movie" className="inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
            Agregar película
          </Link>
        </Card>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Últimas películas agregadas</h2>
        {loading && <Spinner />}
        {!loading && error && <p className="text-center font-bold text-red-500">Error: {error}</p>}
        {!loading && !error && latestMovies.length === 0 && (
          <p className="text-center text-gray-500">Todavía no hay películas registradas.</p>
        )}
        {!loading && !error && latestMovies.length > 0 && (
          <div className="grid-cards grid justify-center gap-4">
            {latestMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onFavoriteChange={handleFavoriteChange} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link to="/movies" className="inline-block rounded bg-yellow-500 px-6 py-3 font-bold text-white hover:bg-yellow-600">
            Ver todas las películas
          </Link>
        </div>
      </section>
    </div>
  );
}
