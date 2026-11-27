import { NavLink } from 'react-router';
import { FaFilm } from 'react-icons/fa';

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/movies', label: 'Películas' },
  { to: '/favorites', label: 'Favoritas' },
  { to: '/add-movie', label: 'Agregar' },
];

const navClass = ({ isActive }) => (isActive ? 'font-bold text-yellow-400' : 'hover:text-yellow-400');

export default function Navbar() {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaFilm aria-hidden="true" /> CineClub
        </NavLink>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={navClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
