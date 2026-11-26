import { useState } from 'react';
import { Link } from 'react-router';
import { FaHeart, FaRegHeart, FaClock, FaCalendarAlt } from 'react-icons/fa';
import MoviePoster from './MoviePoster';

export default function MovieCard({ movie, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false);
  const isLongText = movie.synopsis.length > 100;
  const displaySynopsis = expanded || !isLongText ? movie.synopsis : movie.synopsis.slice(0, 100) + '...';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200">
      <Link to={`/movies/${movie.id}`}>
        <MoviePoster src={movie.poster} title={movie.title} className="w-full aspect-[2/3]" />
      </Link>
      <div className="p-3 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-gray-800 leading-tight">{movie.title}</h3>
          <button onClick={() => onToggleFavorite(movie.id, movie.favorite)} className="text-red-500 text-xl flex-shrink-0 ml-2">
            {movie.favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="flex flex-wrap gap-1 text-xs text-gray-500 mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{movie.category}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{movie.rating}</span>
        </div>
        <p className="text-gray-600 text-xs mb-2">
          {displaySynopsis}
          {isLongText && (
            <button onClick={() => setExpanded(!expanded)} className="text-yellow-600 font-bold ml-1 hover:underline">
              {expanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </p>
        <div className="flex gap-3 text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1"><FaClock /> {movie.duration} min</span>
          <span className="flex items-center gap-1"><FaCalendarAlt /> {movie.year}</span>
        </div>
      </div>
      <div className="bg-gray-50 p-3 border-t border-gray-200 mt-auto">
        <Link to={`/movies/${movie.id}`} className="block text-center text-sm bg-yellow-500 text-white py-1.5 rounded hover:bg-yellow-600 transition">
          Ver Detalle
        </Link>
      </div>
    </div>
  );
}
