import { Link } from 'react-router';
export default function NotFound() {
  return (
    <div className="text-center p-20">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">La página que buscas no existe en CineClub.</p>
      <Link to="/" className="bg-yellow-500 text-white px-6 py-2 rounded">Ir al inicio</Link>
    </div>
  );
}
