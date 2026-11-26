const API_URL = '/api/movies';

export const getMovies = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al cargar las películas');
  return res.json();
};

export const getMovieById = async (id) => {
  const res = await fetch(API_URL + '/' + id);
  if (!res.ok) throw new Error('Película no encontrada');
  return res.json();
};

export const createMovie = async (movie) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  });
  if (!res.ok) throw new Error('Error al crear la película');
  return res.json();
};

export const updateMovie = async (id, movie) => {
  const res = await fetch(API_URL + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  });
  if (!res.ok) throw new Error('Error al actualizar la película');
  return res.json();
};

export const deleteMovie = async (id) => {
  const res = await fetch(API_URL + '/' + id, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar la película');
};

export const toggleFavorite = async (id, favorite) => {
  const res = await fetch(API_URL + '/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite })
  });
  if (!res.ok) throw new Error('Error al actualizar favorito');
  return res.json();
};
