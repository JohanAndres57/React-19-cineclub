export default function Hero({
  title = 'Bienvenido a CineClub',
  subtitle = 'Tu catálogo personal de películas. Explora, descubre y guarda tus favoritas.',
}) {
  return (
    <section className="rounded-xl bg-gray-900 px-4 py-12 text-center text-white shadow-lg sm:py-16">
      <h1 className="mb-4 text-3xl font-extrabold text-yellow-500 sm:text-5xl">{title}</h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">{subtitle}</p>
    </section>
  );
}
