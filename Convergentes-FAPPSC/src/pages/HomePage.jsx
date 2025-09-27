import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Bienvenido a <span className="text-indigo-600">FAPPSC</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mb-8">
          Gestiona tus notas, inicia sesión y colabora fácilmente.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-white text-gray-800 border border-gray-200 font-medium shadow hover:bg-gray-50 transition"
          >
            Crear cuenta
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
