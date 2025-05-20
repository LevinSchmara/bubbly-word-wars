import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { T } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
          <T k="error.notFound.title" />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <T k="error.notFound.message" />
        </p>
        <a 
          href="/" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          <T k="error.notFound.backToHome" />
        </a>
      </div>
    </div>
  );
};

export default NotFound;
