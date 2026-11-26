import { useState, useEffect } from 'react';
import { FaFilm } from 'react-icons/fa';

// Muestra la portada de la película a partir de una URL.
// Si no hay URL o la imagen no carga, muestra un recuadro de respaldo.
export default function MoviePoster({ src, title, className = '' }) {
  const [error, setError] = useState(false);

  // Si cambia la URL (por ejemplo, en la vista previa del formulario), se reintenta
  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-800 text-gray-400 ${className}`}>
        <FaFilm className="text-5xl mb-2" />
        <span className="text-sm">Sin portada</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Portada de ${title || 'la película'}`}
      onError={() => setError(true)}
      className={`object-cover ${className}`}
    />
  );
}
