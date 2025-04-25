// src/pages/SignUp.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";

// Define an interface for the form data shape
interface SignUpFormData {
  name: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string; // Add confirmation field
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(null); // Clear error on change
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      // Basic validation example
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    // --- API Call Simulation ---
    // Exclude confirmPassword when sending to backend
    const { confirmPassword, ...userData } = formData;
    console.log("Attempting sign up:", userData);

    try {
      // Replace with your actual API call to the signup endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // --- Mock API Response Handling ---
      // Assume success for simulation
      console.log("Sign up successful!");
      setSuccessMessage("Registration successful! Please log in.");
      // Optionally reset form
      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Sign up failed:", err);
      // Handle specific errors from backend (e.g., email already exists)
      setError(
        err instanceof Error
          ? err.message
          : "Sign up failed. Please try again.",
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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-md bg-green-100 text-green-700 text-sm">
              {successMessage}
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          {/* Address */}
          <div>
            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"} transition duration-150`}
            >
              {isLoading ? "Registering..." : "Sign up"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
