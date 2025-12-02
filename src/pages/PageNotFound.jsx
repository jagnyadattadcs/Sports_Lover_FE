import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>

      <p className="text-xl text-gray-600 mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
