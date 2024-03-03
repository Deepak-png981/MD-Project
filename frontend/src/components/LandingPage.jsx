import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
      <div>
        <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded mr-4">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white px-6 py-2 rounded">Signup</Link>
      </div>
    </div>
  );
};

export default LandingPage;
