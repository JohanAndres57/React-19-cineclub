import { useState, useEffect } from 'react';
import { getMovies } from '../services/moviesApi';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

export default function Favorites() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies().then(data => {
      setMovies(data.filter(m => m.favorite));
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-red-500">Mis Favoritas</h1>
      {movies.length === 0 ? (
        <p className="text-gray-500">No tienes películas favoritas aún.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,180px)] justify-center gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onToggleFavorite={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
