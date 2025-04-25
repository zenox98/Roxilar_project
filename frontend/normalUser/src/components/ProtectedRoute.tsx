// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../App"; // Import the auth hook

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, render the child components (e.g., Layout and the specific page)
  return <>{children}</>;
};

export default ProtectedRoute;
