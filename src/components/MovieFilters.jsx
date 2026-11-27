import { CATEGORIES, RATINGS } from '../constants/movieOptions';

const controlClass = 'w-full rounded border border-gray-300 bg-white px-3 py-2';

export default function MovieFilters({
  search,
  category,
  rating,
  onSearchChange,
  onCategoryChange,
  onRatingChange,
  onClear,
}) {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label htmlFor="search" className="sr-only">Buscar película</label>
        <input
          id="search"
          type="search"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={controlClass}
        />
      </div>
      <div>
        <label htmlFor="filter-category" className="sr-only">Género</label>
        <select
          id="filter-category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={controlClass}
        >
          <option value="Todas">Todos los géneros</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-rating" className="sr-only">Clasificación</label>
        <select
          id="filter-rating"
          value={rating}
          onChange={(e) => onRatingChange(e.target.value)}
          className={controlClass}
        >
          <option value="Todas">Todas las clasificaciones</option>
          {RATINGS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <button type="button" onClick={onClear} className="rounded border border-gray-300 bg-white px-3 py-2 hover:bg-gray-100">
        Limpiar filtros
      </button>
    </div>
  );
}
