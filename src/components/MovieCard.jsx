import { useState } from 'react';
import { Link } from 'react-router';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import MoviePoster from './MoviePoster';
import FavoriteButton from './FavoriteButton';

const SYNOPSIS_LIMIT = 100;

export default function MovieCard({ movie, onFavoriteChange }) {
  const [expanded, setExpanded] = useState(false);
  const isLongText = movie.synopsis.length > SYNOPSIS_LIMIT;
  const displaySynopsis =
    expanded || !isLongText ? movie.synopsis : `${movie.synopsis.slice(0, SYNOPSIS_LIMIT)}...`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <Link to={`/movies/${movie.id}`}>
        <MoviePoster src={movie.poster} title={movie.title} className="aspect-2/3 w-full" />
      </Link>
      <div className="grow p-3">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base leading-tight font-bold text-gray-800">{movie.title}</h3>
          <FavoriteButton
            movieId={movie.id}
            favorite={movie.favorite}
            onToggled={onFavoriteChange}
            className="text-xl"
          />
        </div>
        <div className="mb-2 flex flex-wrap gap-1 text-xs text-gray-500">
          <span className="rounded bg-gray-100 px-2 py-1">{movie.category}</span>
          <span className="rounded bg-gray-100 px-2 py-1">{movie.rating}</span>
        </div>
        <p className="mb-2 text-xs text-gray-600">
          {displaySynopsis}
          {isLongText && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="ml-1 font-bold text-yellow-600 hover:underline"
            >
              {expanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><FaClock aria-hidden="true" /> {movie.duration} min</span>
          <span className="flex items-center gap-1"><FaCalendarAlt aria-hidden="true" /> {movie.year}</span>
        </div>
      </div>
      <div className="mt-auto border-t border-gray-200 bg-gray-50 p-3">
        <Link
          to={`/movies/${movie.id}`}
          className="block rounded bg-yellow-500 py-1.5 text-center text-sm text-white transition hover:bg-yellow-600"
        >
          Ver Detalle
        </Link>
      </div>
    </article>
  );
}
