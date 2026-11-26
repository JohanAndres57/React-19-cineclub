import { useLoaderData, useNavigate } from 'react-router';
import { updateMovie } from '../services/moviesApi';
import { toast } from 'react-toastify';
import MovieForm from '../components/MovieForm';

export default function EditMovie() {
  // La película se carga con el mismo loader que usa MovieDetail (ver main.jsx)
  const movie = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (changes) => {
    try {
      // Se conservan id, favorite y createdAt de la película original
      await updateMovie(movie.id, { ...movie, ...changes });
      toast.success('Película actualizada');
      navigate(`/movies/${movie.id}`);
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Editar Película</h1>
      <MovieForm
        initialMovie={movie}
        onSubmit={handleSubmit}
        submitText="Guardar Cambios"
        submitClass="bg-blue-600 hover:bg-blue-700"
        onCancel={() => navigate(`/movies/${movie.id}`)}
      />
    </div>
  );
}
