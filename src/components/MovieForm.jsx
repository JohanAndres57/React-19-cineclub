import { useRef, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Input from './Input';
import MoviePoster from './MoviePoster';
import { CATEGORIES, RATINGS } from '../constants/movieOptions';

const MIN_YEAR = 1888;
const MAX_YEAR = 2030;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Orden de los campos en pantalla: se enfoca el primero que tenga error
const FIELD_ORDER = ['title', 'poster', 'duration', 'year', 'synopsis', 'cast', 'directorName', 'directorEmail'];

// Cada fila dinámica lleva un id propio para usarlo como key (nunca el índice)
const newId = () => crypto.randomUUID();
const emptyCastRow = () => ({ id: newId(), actor: '', role: '' });
const emptyAwardRow = () => ({ id: newId(), text: '' });

// Película de la API → valores del formulario
const movieToForm = (movie = {}) => ({
  title: movie.title ?? '',
  poster: movie.poster ?? '',
  category: movie.category ?? CATEGORIES[0],
  rating: movie.rating ?? RATINGS[0],
  duration: movie.duration ?? '',
  year: movie.year ?? '',
  synopsis: movie.synopsis ?? '',
  cast: movie.cast?.length
    ? movie.cast.map((c) => ({ id: newId(), actor: c.actor, role: c.role }))
    : [emptyCastRow()],
  awards: (movie.awards ?? []).map((text) => ({ id: newId(), text })),
  directorName: movie.director?.name ?? '',
  directorEmail: movie.director?.email ?? '',
  directorBio: movie.director?.bio ?? '',
});

// Valores del formulario → objeto que se guarda en la API
const formToMovie = (form) => ({
  title: form.title.trim(),
  poster: form.poster.trim(),
  category: form.category,
  rating: form.rating,
  duration: Number(form.duration),
  year: Number(form.year),
  synopsis: form.synopsis.trim(),
  cast: form.cast
    .filter((row) => row.actor.trim() !== '')
    .map((row) => ({ actor: row.actor.trim(), role: row.role.trim() || 'Desconocido' })),
  awards: form.awards.map((row) => row.text.trim()).filter((text) => text !== ''),
  director: {
    name: form.directorName.trim(),
    email: form.directorEmail.trim(),
    bio: form.directorBio.trim(),
  },
});

// Devuelve un objeto { campo: mensaje } con los campos inválidos
const validate = (form) => {
  const errors = {};
  const poster = form.poster.trim();
  const duration = Number(form.duration);
  const year = Number(form.year);

  if (!form.title.trim()) errors.title = 'El título es obligatorio.';
  if (poster && !/^https?:\/\//.test(poster)) errors.poster = 'La portada debe ser una URL que empiece por http:// o https://';
  if (!Number.isInteger(duration) || duration <= 0) errors.duration = 'La duración debe ser un número entero mayor que 0.';
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) errors.year = `El año debe estar entre ${MIN_YEAR} y ${MAX_YEAR}.`;
  if (!form.synopsis.trim()) errors.synopsis = 'La sinopsis es obligatoria.';
  if (!form.cast.some((row) => row.actor.trim() !== '')) errors.cast = 'Agrega al menos un actor.';
  if (!form.directorName.trim()) errors.directorName = 'El nombre del director es obligatorio.';
  if (!EMAIL_REGEX.test(form.directorEmail.trim())) errors.directorEmail = 'Escribe un correo válido (ejemplo@correo.com).';

  return errors;
};

// Formulario compartido por Agregar y Editar película
export default function MovieForm({
  initialMovie,
  onSubmit,
  submitText = 'Guardar',
  submitClass = 'bg-yellow-500 hover:bg-yellow-600',
  onCancel,
}) {
  const [form, setForm] = useState(() => movieToForm(initialMovie));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fieldRefs = {
    title: useRef(null),
    poster: useRef(null),
    duration: useRef(null),
    year: useRef(null),
    synopsis: useRef(null),
    cast: useRef(null),
    directorName: useRef(null),
    directorEmail: useRef(null),
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  // Filas de reparto: se actualizan sin mutar (map, filter y spread)
  const updateCastRow = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      cast: prev.cast.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    }));
    clearError('cast');
  };
  const addCastRow = () => setForm((prev) => ({ ...prev, cast: [...prev.cast, emptyCastRow()] }));
  const removeCastRow = (id) => setForm((prev) => ({ ...prev, cast: prev.cast.filter((row) => row.id !== id) }));

  // Filas de premios
  const updateAwardRow = (id, text) => {
    setForm((prev) => ({
      ...prev,
      awards: prev.awards.map((row) => (row.id === id ? { ...row, text } : row)),
    }));
  };
  const addAwardRow = () => setForm((prev) => ({ ...prev, awards: [...prev.awards, emptyAwardRow()] }));
  const removeAwardRow = (id) => setForm((prev) => ({ ...prev, awards: prev.awards.filter((row) => row.id !== id) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);

    const firstError = FIELD_ORDER.find((field) => newErrors[field]);
    if (firstError) {
      fieldRefs[firstError].current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formToMovie(form));
    } finally {
      setSubmitting(false);
    }
  };

  const posterUrl = form.poster.trim();

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        label="Título"
        id="title"
        ref={fieldRefs.title}
        value={form.title}
        onChange={handleChange}
        error={errors.title}
      />

      <div>
        <Input
          label="Portada (URL de la imagen)"
          id="poster"
          type="url"
          ref={fieldRefs.poster}
          value={form.poster}
          onChange={handleChange}
          placeholder="https://ejemplo.com/portada.jpg"
          error={errors.poster}
        />
        {posterUrl && (
          <MoviePoster src={posterUrl} title={form.title} className="mt-3 aspect-2/3 w-32 rounded-md" />
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input as="select" label="Género" id="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Input>
        <Input as="select" label="Clasificación" id="rating" value={form.rating} onChange={handleChange}>
          {RATINGS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </Input>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Duración (min)"
          id="duration"
          type="number"
          min="1"
          ref={fieldRefs.duration}
          value={form.duration}
          onChange={handleChange}
          error={errors.duration}
        />
        <Input
          label="Año"
          id="year"
          type="number"
          min={MIN_YEAR}
          max={MAX_YEAR}
          ref={fieldRefs.year}
          value={form.year}
          onChange={handleChange}
          error={errors.year}
        />
      </div>

      <Input
        as="textarea"
        label="Sinopsis"
        id="synopsis"
        rows="3"
        ref={fieldRefs.synopsis}
        value={form.synopsis}
        onChange={handleChange}
        error={errors.synopsis}
      />

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-lg font-bold">Reparto</legend>
        <div className="space-y-3">
          {form.cast.map((row, index) => (
            <div key={row.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <Input
                label={`Actor ${index + 1}`}
                id={`cast-actor-${row.id}`}
                ref={index === 0 ? fieldRefs.cast : undefined}
                value={row.actor}
                onChange={(e) => updateCastRow(row.id, 'actor', e.target.value)}
                className="grow"
              />
              <Input
                label={`Personaje ${index + 1}`}
                id={`cast-role-${row.id}`}
                value={row.role}
                onChange={(e) => updateCastRow(row.id, 'role', e.target.value)}
                className="grow"
              />
              <button
                type="button"
                onClick={() => removeCastRow(row.id)}
                disabled={form.cast.length === 1}
                aria-label={`Quitar actor ${index + 1}`}
                className="self-end rounded bg-red-100 p-3 text-red-600 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaTrash aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
        {errors.cast && <p className="mt-2 text-sm text-red-600">{errors.cast}</p>}
        <button
          type="button"
          onClick={addCastRow}
          className="mt-3 flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-semibold hover:bg-gray-200"
        >
          <FaPlus aria-hidden="true" /> Agregar actor
        </button>
      </fieldset>

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-lg font-bold">Premios (opcional)</legend>
        {form.awards.length === 0 && <p className="text-sm text-gray-500">Sin premios agregados.</p>}
        <div className="space-y-3">
          {form.awards.map((row, index) => (
            <div key={row.id} className="flex items-end gap-2">
              <Input
                label={`Premio ${index + 1}`}
                id={`award-${row.id}`}
                value={row.text}
                onChange={(e) => updateAwardRow(row.id, e.target.value)}
                className="grow"
              />
              <button
                type="button"
                onClick={() => removeAwardRow(row.id)}
                aria-label={`Quitar premio ${index + 1}`}
                className="rounded bg-red-100 p-3 text-red-600 hover:bg-red-200"
              >
                <FaTrash aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addAwardRow}
          className="mt-3 flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-semibold hover:bg-gray-200"
        >
          <FaPlus aria-hidden="true" /> Agregar premio
        </button>
      </fieldset>

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-lg font-bold">Director</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nombre"
            id="directorName"
            ref={fieldRefs.directorName}
            value={form.directorName}
            onChange={handleChange}
            error={errors.directorName}
          />
          <Input
            label="Email"
            id="directorEmail"
            type="email"
            ref={fieldRefs.directorEmail}
            value={form.directorEmail}
            onChange={handleChange}
            error={errors.directorEmail}
          />
        </div>
        <Input
          label="Bio (opcional)"
          id="directorBio"
          value={form.directorBio}
          onChange={handleChange}
          className="mt-4"
        />
      </fieldset>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded bg-gray-200 py-3 font-bold text-gray-800 hover:bg-gray-300"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className={`flex-1 rounded py-3 font-bold text-white transition disabled:opacity-60 ${submitClass}`}
        >
          {submitting ? 'Guardando...' : submitText}
        </button>
      </div>
    </form>
  );
}
