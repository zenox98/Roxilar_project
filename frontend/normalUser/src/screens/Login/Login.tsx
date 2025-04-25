// src/pages/LoginPage.tsx
import React, { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../App"; // Import auth hook
import { User } from "../../types"; // Import User interface

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the location to redirect to after login (if user tried accessing a protected route)
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // --- API Call Simulation ---
    console.log("Attempting login:", { email, password });
    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      // --- Mock API Response (Replace with actual response handling) ---
      // IMPORTANT: The backend MUST return the user's details on successful login, including their role.
      const mockUserResponse: User = {
        id: "user123",
        name: "Test User",
        email: email,
        address: "123 Test St",
        role: "Normal User", // Crucial: Backend determines the role
      };

      // Check if the role is correct (although backend should ideally handle this)
      if (mockUserResponse.role !== "Normal User") {
        throw new Error("Access denied. Invalid role.");
      }

      login(mockUserResponse); // Update auth state using context function
      navigate(from, { replace: true }); // Redirect to intended page or home
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
    // --- End API Call Simulation ---
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"} transition duration-150`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
