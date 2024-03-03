import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // User is authenticated
    return <Navigate to="/profile" replace />;
  }

  return children;
};
export default PublicRoute;
