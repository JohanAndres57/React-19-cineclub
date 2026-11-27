const API_URL = '/api/movies';

export const getMovies = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al cargar las películas');
  return res.json();
};

// json-server 1.x: _sort=-createdAt ordena de la más nueva a la más vieja
// y con _page/_per_page la respuesta trae las películas dentro de "data"
export const getLatestMovies = async (limit = 3) => {
  const res = await fetch(`${API_URL}?_sort=-createdAt&_page=1&_per_page=${limit}`);
  if (!res.ok) throw new Error('Error al cargar las últimas películas');
  const json = await res.json();
  return Array.isArray(json) ? json : json.data;
};

export const getMovieById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Película no encontrada');
  return res.json();
};

export const createMovie = async (movie) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error('Error al crear la película');
  return res.json();
};

export const updateMovie = async (id, movie) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error('Error al actualizar la película');
  return res.json();
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar la película');
};

export const toggleFavorite = async (id, favorite) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite }),
  });
  if (!res.ok) throw new Error('Error al actualizar favorita');
  return res.json();
};
