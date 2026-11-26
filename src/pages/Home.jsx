import { Link } from 'react-router';
import { FaFilm, FaStar } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gray-900 text-white rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 text-yellow-500">Bienvenido a CineClub</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Tu catálogo personal de películas. Explora, descubre y guarda tus favoritas.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-500">
          <FaFilm className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Para Cinéfilos</h2>
          <p className="text-gray-600 mb-4">Encuentra los detalles técnicos, reparto y premios de tus películas favoritas.</p>
          <Link to="/movies" className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">Explorar Catálogo</Link>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-500">
          <FaStar className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Para Coleccionistas</h2>
          <p className="text-gray-600 mb-4">Agrega nuevas películas a tu colección y marca tus favoritas para tenerlas siempre a mano.</p>
          <Link to="/add-movie" className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">Agregar Película</Link>
        </div>
      </section>
    </div>
  );
}
