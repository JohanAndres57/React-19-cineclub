import { useNavigate } from 'react-router';
import { createMovie } from '../services/moviesApi';
import { toast } from 'react-toastify';
import MovieForm from '../components/MovieForm';

export default function AddMovie() {
  const navigate = useNavigate();

  const handleSubmit = async (movie) => {
    try {
      await createMovie({ ...movie, favorite: false, createdAt: new Date().toISOString() });
      toast.success('Película creada con éxito');
      navigate('/movies');
    } catch (error) {
      toast.error('Error al crear la película');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Agregar Película</h1>
      <MovieForm
        onSubmit={handleSubmit}
        submitText="Guardar Película"
        submitClass="bg-yellow-500 hover:bg-yellow-600"
      />
    </div>
  );
}
