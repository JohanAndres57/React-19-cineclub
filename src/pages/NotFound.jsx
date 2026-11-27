import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="p-10 text-center sm:p-20">
      <title>Página no encontrada | CineClub</title>
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-xl text-gray-600">La página que buscas no existe en CineClub.</p>
      <Link to="/" className="rounded bg-yellow-500 px-6 py-2 text-white hover:bg-yellow-600">
        Ir al inicio
      </Link>
    </div>
  );
}
