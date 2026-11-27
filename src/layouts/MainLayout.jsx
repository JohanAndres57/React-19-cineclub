import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="container mx-auto grow p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-900 p-4 text-center text-white">
        &copy; 2026 CineClub - Proyecto React 19
      </footer>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
