import { getMovieById } from '../services/moviesApi';

// Se ejecuta ANTES de mostrar el detalle o la edición: la página ya recibe la película cargada
export async function movieLoader({ params }) {
  try {
    return await getMovieById(params.id);
  } catch {
    throw new Response('Película no encontrada', { status: 404 });
  }
}
