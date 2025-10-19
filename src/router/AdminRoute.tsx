// src/router/AdminRoute.tsx
import React from 'react';
import { useAuthStore } from '../store/auth.store';
import { Navigate, useLocation } from 'react-router-dom';

// This component will wrap any page you want to protect
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user || !user.isAdmin) {
    // If the user is not an admin,
    // send them to the login page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If they are an admin, show the page
  return <>{children}</>;
};

export default AdminRoute;