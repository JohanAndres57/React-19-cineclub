import { Outlet, NavLink } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilm } from 'react-icons/fa';

const navClass = ({ isActive }) => (isActive ? 'text-yellow-400 font-bold' : 'hover:text-yellow-400');

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gray-900 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaFilm /> CineClub
          </NavLink>
          <ul className="flex gap-4">
            <li><NavLink to="/" className={navClass}>Inicio</NavLink></li>
            <li><NavLink to="/movies" className={navClass}>Películas</NavLink></li>
            <li><NavLink to="/favorites" className={navClass}>Favoritas</NavLink></li>
            <li><NavLink to="/add-movie" className={navClass}>Agregar</NavLink></li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4 flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white text-center p-4">
        &copy; 2026 CineClub - Proyecto React 19
      </footer>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default MainLayout;
