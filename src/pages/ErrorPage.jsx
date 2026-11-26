import { useRouteError, Link } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="text-center p-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">¡Ups! Algo salió mal</h1>
      <p className="text-gray-600 mb-6">{error?.message || 'No pudimos encontrar lo que buscabas.'}</p>
      <Link to="/" className="bg-yellow-500 text-white px-4 py-2 rounded">Volver al inicio</Link>
    </div>
  );
}
