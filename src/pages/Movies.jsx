import { useState, useEffect } from 'react';
import { getMovies, toggleFavorite } from '../services/moviesApi';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id, currentFav) => {
    try {
      // Optimistic update
      setMovies(movies.map(m => m.id === id ? { ...m, favorite: !currentFav } : m));
      await toggleFavorite(id, !currentFav);
      toast.success(!currentFav ? 'Agregada a favoritas' : 'Eliminada de favoritas');
    } catch (err) {
      // Revert on error
      setMovies(movies.map(m => m.id === id ? { ...m, favorite: currentFav } : m));
      toast.error('Error al actualizar favorito');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500 text-center p-10 font-bold text-xl">Error: {error}</div>;
  if (movies.length === 0) return <div className="text-center p-10 text-gray-500">No hay películas registradas aún.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Nuestro Catálogo</h1>
      <div className="grid grid-cols-[repeat(auto-fill,180px)] justify-center gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onToggleFavorite={handleToggleFavorite} />
        ))}
      </div>
    </div>
  );
}
