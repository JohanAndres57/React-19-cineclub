import { useLoaderData, useNavigate, useRevalidator, Link } from 'react-router';
import { toast } from 'react-toastify';
import { FaEnvelope, FaAward } from 'react-icons/fa';
import { deleteMovie } from '../services/moviesApi';
import MoviePoster from '../components/MoviePoster';
import FavoriteButton from '../components/FavoriteButton';

export default function MovieDetail() {
  // La película llega desde movieLoader (ver main.jsx)
  const movie = useLoaderData();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta película?')) return;
    try {
      await deleteMovie(movie.id);
      toast.success('Película eliminada');
      navigate('/movies');
    } catch {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-4 shadow-lg sm:p-8">
      <title>{`${movie.title} | CineClub`}</title>

      <div className="mb-6 flex flex-col items-start gap-6 sm:flex-row">
        <MoviePoster
          src={movie.poster}
          title={movie.title}
          className="h-72 w-48 shrink-0 self-center rounded-lg shadow-md sm:self-start"
        />
        <div className="w-full">
          <div className="mb-2 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{movie.title}</h1>
            {/* Al cambiar la favorita se vuelve a ejecutar el loader para traer el dato actualizado */}
            <FavoriteButton
              movieId={movie.id}
              favorite={movie.favorite}
              onToggled={() => revalidator.revalidate()}
              className="text-3xl"
            />
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-800">{movie.category}</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-800">{movie.rating}</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-800">{movie.duration} min</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-800">{movie.year}</span>
          </div>
          <p className="mt-6 text-lg text-gray-700">{movie.synopsis}</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-800">Reparto</h2>
          <ul className="space-y-2">
            {(movie.cast ?? []).map((actor, index) => (
              <li key={`${actor.actor}-${index}`} className="flex flex-wrap justify-between gap-2">
                <span className="font-semibold">{actor.actor}</span>
                <span className="text-gray-500 italic">como {actor.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-800">Premios</h2>
          {(movie.awards ?? []).length === 0 ? (
            <p className="text-gray-500">Sin premios registrados.</p>
          ) : (
            <ol className="space-y-2">
              {movie.awards.map((award, index) => (
                <li key={`${award}-${index}`} className="flex items-center gap-2 text-gray-700">
                  <FaAward className="shrink-0 text-yellow-500" aria-hidden="true" /> {index + 1}. {award}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="mb-8 rounded-lg bg-gray-50 p-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">Director</h2>
        <p className="font-semibold">{movie.director?.name}</p>
        {movie.director?.bio && <p className="mb-2 text-sm text-gray-600">{movie.director.bio}</p>}
        <p className="flex items-center gap-2 text-sm break-all text-gray-500">
          <FaEnvelope className="shrink-0" aria-hidden="true" /> {movie.director?.email}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/movies" className="rounded bg-gray-200 px-4 py-2 text-center text-gray-800 hover:bg-gray-300">
          Volver al listado
        </Link>
        <Link to={`/edit-movie/${movie.id}`} className="rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700">
          Editar
        </Link>
        <button type="button" onClick={handleDelete} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Eliminar
        </button>
      </div>
    </div>
  );
}
