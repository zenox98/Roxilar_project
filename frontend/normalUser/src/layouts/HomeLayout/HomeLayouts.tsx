// src/components/Layout.tsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { useAuth } from "../../App.tsx"; // Import the auth hook

const HomeLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Store Rater
            </Link>
            {/* Add other nav links if needed */}
            <Link to="/" className="ml-6 text-gray-600 hover:text-gray-900">
              Stores
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm hidden sm:inline">
              Welcome, {user?.name ?? "User"}
            </span>
            <Link
              to="/settings"
              className="text-sm text-gray-600 hover:text-gray-900"
              title="Profile Settings"
            >
              {/* Icon or Text for settings */}
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium transition duration-150"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet /> {/* Child routes will render here */}
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-gray-200 text-center text-sm text-gray-600 p-4">
        © {new Date().getFullYear()} Store Rater App
      </footer>
    </div>
  );
};

export default HomeLayout;
