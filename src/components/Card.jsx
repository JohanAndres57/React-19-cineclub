// Tarjeta genérica: dibuja lo que reciba en children; bg permite cambiar el fondo
export default function Card({ children, bg = 'bg-white' }) {
  return (
    <div className={`${bg} rounded-xl border border-gray-200 p-6 shadow-md sm:p-8`}>
      {children}
    </div>
  );
}
