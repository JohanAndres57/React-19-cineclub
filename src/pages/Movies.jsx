import { useState, useEffect } from 'react';
import { getMovies } from '../services/moviesApi';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import MovieFilters from '../components/MovieFilters';
import Pagination from '../components/Pagination';

const PER_PAGE = 8;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [rating, setRating] = useState('Todas');
  const [page, setPage] = useState(1);

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

  // Estado derivado: la lista filtrada se CALCULA en cada render, no se guarda en otro useState
  const text = search.trim().toLowerCase();
  const filteredMovies = movies.filter((movie) => {
    const matchesText = movie.title.toLowerCase().includes(text);
    const matchesCategory = category === 'Todas' || movie.category === category;
    const matchesRating = rating === 'Todas' || movie.rating === rating;
    return matchesText && matchesCategory && matchesRating;
  });

  // Paginación sobre la lista ya filtrada
  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageMovies = filteredMovies.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  // Al cambiar un filtro se vuelve a la página 1
  const changeFilter = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('Todas');
    setRating('Todas');
    setPage(1);
  };

  const handleFavoriteChange = (updated) => {
    setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-10 text-center text-xl font-bold text-red-500">Error: {error}</div>;

  return (
    <div>
      <title>Películas | CineClub</title>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Nuestro Catálogo</h1>

      {movies.length === 0 ? (
        <p className="p-10 text-center text-gray-500">No hay películas registradas aún.</p>
      ) : (
        <>
          <MovieFilters
            search={search}
            category={category}
            rating={rating}
            onSearchChange={changeFilter(setSearch)}
            onCategoryChange={changeFilter(setCategory)}
            onRatingChange={changeFilter(setRating)}
            onClear={clearFilters}
          />

          <p className="mb-4 text-gray-600">
            {filteredMovies.length} de {movies.length} películas
          </p>

          {filteredMovies.length === 0 ? (
            <p className="p-10 text-center text-gray-500">No encontramos películas con esos filtros.</p>
          ) : (
            <div className="grid-cards grid justify-center gap-4">
              {pageMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onFavoriteChange={handleFavoriteChange} />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
