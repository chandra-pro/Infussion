// src/pages/NotFoundPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
