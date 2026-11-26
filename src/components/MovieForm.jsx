import { useState } from 'react';
import MoviePoster from './MoviePoster';

const CATEGORIES = ['Acción', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 'Animación', 'Crimen', 'Fantasía'];
const RATINGS = ['ATP', '+13', '+16', '+18'];

const inputClass = 'mt-1 block w-full border border-gray-300 rounded-md p-2';
const labelClass = 'block text-sm font-medium text-gray-700';

// Convierte una película (como viene de la API) en los valores del formulario
const movieToForm = (movie = {}) => ({
  title: movie.title || '',
  poster: movie.poster || '',
  category: movie.category || CATEGORIES[0],
  rating: movie.rating || RATINGS[0],
  duration: movie.duration ?? '',
  year: movie.year ?? '',
  synopsis: movie.synopsis || '',
  castText: (movie.cast || []).map(c => `${c.actor}:${c.role}`).join(', '),
  awardsText: (movie.awards || []).join(', '),
  directorName: movie.director?.name || '',
  directorEmail: movie.director?.email || '',
  directorBio: movie.director?.bio || '',
});

// Convierte los valores del formulario en el objeto que se guarda en la API
const formToMovie = (form) => ({
  title: form.title,
  poster: form.poster.trim(),
  category: form.category,
  rating: form.rating,
  duration: Number(form.duration),
  year: Number(form.year),
  synopsis: form.synopsis,
  cast: form.castText
    .split(',')
    .filter(c => c.trim() !== '')
    .map(c => {
      const [actor, role] = c.split(':');
      return { actor: actor?.trim() || '', role: role?.trim() || 'Desconocido' };
    }),
  awards: form.awardsText.split(',').map(a => a.trim()).filter(a => a !== ''),
  director: { name: form.directorName, email: form.directorEmail, bio: form.directorBio },
});

// Formulario compartido por Agregar y Editar película
export default function MovieForm({ initialMovie, onSubmit, submitText, submitClass, onCancel }) {
  const [form, setForm] = useState(() => movieToForm(initialMovie));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formToMovie(form));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>Título</label>
        <input type="text" id="title" name="title" value={form.title} onChange={handleChange} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="poster" className={labelClass}>Portada (URL de la imagen)</label>
        <input type="url" id="poster" name="poster" value={form.poster} onChange={handleChange} placeholder="https://ejemplo.com/portada.jpg" className={inputClass} />
        {form.poster && <MoviePoster src={form.poster} title={form.title} className="mt-3 w-32 aspect-[2/3] rounded-md" />}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className={labelClass}>Género</label>
          <select id="category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="rating" className={labelClass}>Clasificación</label>
          <select id="rating" name="rating" value={form.rating} onChange={handleChange} className={inputClass}>
            {RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className={labelClass}>Duración (min)</label>
          <input type="number" id="duration" name="duration" value={form.duration} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="year" className={labelClass}>Año</label>
          <input type="number" id="year" name="year" value={form.year} onChange={handleChange} required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="synopsis" className={labelClass}>Sinopsis</label>
        <textarea id="synopsis" name="synopsis" rows="3" value={form.synopsis} onChange={handleChange} required className={inputClass}></textarea>
      </div>
      <div>
        <label htmlFor="castText" className={labelClass}>Reparto (Formato: Actor:Personaje, separados por coma)</label>
        <input type="text" id="castText" name="castText" value={form.castText} placeholder="Tom Hanks:Woody, Tim Allen:Buzz" onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="awardsText" className={labelClass}>Premios (separados por coma)</label>
        <input type="text" id="awardsText" name="awardsText" value={form.awardsText} placeholder="Oscar a Mejor Película, Globo de Oro" onChange={handleChange} className={inputClass} />
      </div>

      <div className="border-t pt-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Director</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="directorName" className={labelClass}>Nombre</label>
            <input type="text" id="directorName" name="directorName" value={form.directorName} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="directorEmail" className={labelClass}>Email</label>
            <input type="email" id="directorEmail" name="directorEmail" value={form.directorEmail} onChange={handleChange} required className={inputClass} />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="directorBio" className={labelClass}>Bio (opcional)</label>
          <input type="text" id="directorBio" name="directorBio" value={form.directorBio} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded hover:bg-gray-300">Cancelar</button>
        )}
        <button type="submit" className={`flex-1 text-white font-bold py-3 rounded transition ${submitClass}`}>{submitText}</button>
      </div>
    </form>
  );
}
