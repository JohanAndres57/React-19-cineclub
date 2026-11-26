import { useLoaderData, Link, useNavigate } from 'react-router';
import { getMovieById, deleteMovie } from '../services/moviesApi';
import { toast } from 'react-toastify';
import { FaEnvelope, FaAward } from 'react-icons/fa';
import MoviePoster from '../components/MoviePoster';

export async function movieLoader({ params }) {
  try {
    return await getMovieById(params.id);
  } catch (error) {
    throw new Response("Película no encontrada", { status: 404 });
  }
}

export default function MovieDetail() {
  const movie = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar esta película?')) {
      try {
        await deleteMovie(movie.id);
        toast.success('Película eliminada');
        navigate('/movies');
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
        <MoviePoster src={movie.poster} title={movie.title} className="w-48 h-72 rounded-lg shadow-md flex-shrink-0" />
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{movie.title}</h1>
          <div className="flex gap-3 text-sm">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">{movie.category}</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">{movie.rating}</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">{movie.duration} min</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">{movie.year}</span>
          </div>
          <p className="text-lg text-gray-700 mt-6">{movie.synopsis}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Reparto</h2>
          <ul className="space-y-2">
            {(movie.cast || []).map((actor, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-semibold">{actor.actor}</span>
                <span className="text-gray-500 italic">como {actor.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Premios</h2>
          <ul className="space-y-2">
            {(movie.awards || []).map((award, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <FaAward className="text-yellow-500" /> {award}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Director</h2>
        <p className="font-semibold">{movie.director?.name}</p>
        <p className="text-sm text-gray-600 mb-2">{movie.director?.bio}</p>
        <p className="text-sm text-gray-500 flex items-center gap-2"><FaEnvelope /> {movie.director?.email}</p>
      </div>

      <div className="flex gap-4">
        <Link to="/movies" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Volver al listado</Link>
        <Link to={`/edit-movie/${movie.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Editar</Link>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Eliminar</button>
      </div>
    </div>
  );
}
