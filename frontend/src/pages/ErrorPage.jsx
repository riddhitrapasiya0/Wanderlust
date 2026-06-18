import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const statusCode = error?.status || error?.statusCode || 404;
  const message =
    error?.statusText ||
    error?.data?.message ||
    error?.message ||
    "Page Not Found!";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        <div className="text-rose-500 text-8xl mb-4">
          <i className="fa-solid fa-exclamation-triangle"></i>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">{statusCode}</h1>
        <p className="text-xl text-gray-600 mb-8">{message}</p>
        <Link
          to="/listings"
          className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition font-medium"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
