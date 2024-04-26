import React from "react";
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  if (isAuthenticated()) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};
