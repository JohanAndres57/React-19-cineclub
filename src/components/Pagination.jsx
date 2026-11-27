export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const buttonClass = 'rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav aria-label="Paginación" className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass}
      >
        Anterior
      </button>
      <span className="text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClass}
      >
        Siguiente
      </button>
    </nav>
  );
}
