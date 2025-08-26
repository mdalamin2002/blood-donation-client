import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const Nofound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded">
          Back to Home
        </button>
      </Link>
    </div>
    );
};

export default Nofound;