import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { updateMovie } from '../services/moviesApi';
import MovieForm from '../components/MovieForm';

export default function EditMovie() {
  // Usa el mismo movieLoader que MovieDetail (ver main.jsx)
  const movie = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (changes) => {
    try {
      // Se conservan id, favorite y createdAt de la película original
      await updateMovie(movie.id, { ...movie, ...changes });
      toast.success('Película actualizada');
      navigate(`/movies/${movie.id}`);
    } catch {
      toast.error('Error al actualizar');
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-4 shadow-lg sm:p-8">
      <title>{`Editar ${movie.title} | CineClub`}</title>
      <h1 className="mb-6 text-3xl font-bold">Editar película</h1>
      <MovieForm
        initialMovie={movie}
        onSubmit={handleSubmit}
        submitText="Guardar cambios"
        submitClass="bg-blue-600 hover:bg-blue-700"
        onCancel={() => navigate(`/movies/${movie.id}`)}
      />
    </div>
  );
}
