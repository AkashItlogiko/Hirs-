import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/dashboard" className="text-blue-500 hover:underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
