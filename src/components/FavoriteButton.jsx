import { useOptimistic, useTransition } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { toggleFavorite } from '../services/moviesApi';

// Reto React 19 (RT-03): el corazón cambia al instante con useOptimistic
// y vuelve solo a su valor real si el PATCH falla
export default function FavoriteButton({ movieId, favorite, onToggled, className = '' }) {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(favorite);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticFavorite(!favorite);
      try {
        const updated = await toggleFavorite(movieId, !favorite);
        await onToggled?.(updated);
        toast.success(updated.favorite ? 'Agregada a favoritas' : 'Eliminada de favoritas');
      } catch {
        toast.error('Error al actualizar favorita');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={optimisticFavorite}
      aria-label={optimisticFavorite ? 'Quitar de favoritas' : 'Agregar a favoritas'}
      className={`shrink-0 text-red-500 disabled:opacity-60 ${className}`}
    >
      {optimisticFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
