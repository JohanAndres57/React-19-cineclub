import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();

  let message = 'Ocurrió un error inesperado.';
  if (isRouteErrorResponse(error)) {
    message = typeof error.data === 'string' ? error.data : error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="p-10 text-center sm:p-20">
      <title>Error | CineClub</title>
      <h1 className="mb-4 text-4xl font-bold text-red-600">¡Ups! Algo salió mal</h1>
      <p className="mb-6 text-gray-600">{message}</p>
      <Link to="/" className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
        Volver al inicio
      </Link>
    </div>
  );
}
