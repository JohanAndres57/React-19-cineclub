import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { createMovie } from '../services/moviesApi';
import MovieForm from '../components/MovieForm';

export default function AddMovie() {
  const navigate = useNavigate();

  const handleSubmit = async (movie) => {
    try {
      // Esperamos la respuesta del servidor ANTES de avisar y navegar
      await createMovie({ ...movie, favorite: false, createdAt: new Date().toISOString() });
      toast.success('Película creada con éxito');
      navigate('/movies');
    } catch {
      toast.error('Error al crear la película');
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-4 shadow-lg sm:p-8">
      <title>Agregar película | CineClub</title>
      <h1 className="mb-6 text-3xl font-bold">Agregar película</h1>
      <MovieForm
        onSubmit={handleSubmit}
        submitText="Guardar película"
        submitClass="bg-yellow-500 hover:bg-yellow-600"
      />
    </div>
  );
}
