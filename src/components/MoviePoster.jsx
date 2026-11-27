import { useState } from 'react';
import { FaFilm } from 'react-icons/fa';

// Muestra la portada a partir de una URL. Si no hay URL o la imagen no carga, muestra un respaldo.
export default function MoviePoster({ src, title = 'la película', className = '' }) {
  // Guardamos QUÉ URL falló: si la URL cambia, se vuelve a intentar sin necesidad de useEffect
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-800 text-gray-400 ${className}`}>
        <FaFilm className="mb-2 text-5xl" aria-hidden="true" />
        <span className="text-sm">Sin portada</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Portada de ${title}`}
      onError={() => setFailedSrc(src)}
      className={`object-cover ${className}`}
    />
  );
}
