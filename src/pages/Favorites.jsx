import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getMovies } from '../services/moviesApi';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

export default function Favorites() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadMovies = async () => {
      try {
        const data = await getMovies();
        if (!ignore) setMovies(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadMovies();
    return () => {
      ignore = true;
    };
  }, []);

  // Estado derivado: si se desmarca una película, desaparece sola de esta lista
  const favorites = movies.filter((m) => m.favorite);

  const handleFavoriteChange = (updated) => {
    setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-10 text-center text-xl font-bold text-red-500">Error: {error}</div>;

  return (
    <div>
      <title>Favoritas | CineClub</title>
      <h1 className="mb-6 text-3xl font-bold text-red-500">Mis favoritas</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">
          No tienes películas favoritas aún.{' '}
          <Link to="/movies" className="font-semibold text-yellow-600 hover:underline">Explora el catálogo</Link>
        </p>
      ) : (
        <div className="grid-cards grid justify-center gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onFavoriteChange={handleFavoriteChange} />
          ))}
        </div>
      )}
    </div>
  );
}
