// src/App.tsx
import { useState, createContext, useContext, useMemo } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router";

import Login from "./screens/Login/Login";
import SignUp from "./screens/SignUp/SignUp";
import StoreList from "./screens/StoreList/StoreList";
import ProfileSettingsPage from "./screens/ProfileSetting/ProfileSetting";
import HomeLayout from "./layouts/HomeLayout/HomeLayouts";
import ProtectedRoute from "./components/ProtectedRoute";
import { User } from "./types"; // Import User interface

// --- Authentication Context (Basic Example) ---
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Provide a default value matching the context type structure
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => { }, // No-op default function
  logout: () => { }, // No-op default function
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
// --- End Authentication Context ---

function App() {
  // Simulate authentication state - replace with real auth logic/context
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Check local storage or cookies for existing session on initial load
    return !!localStorage.getItem("authToken"); // Example check
  });
  const [user, setUser] = useState<User | null>(() => {
    // Load user data if logged in
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });

  // Provide login/logout functions via context
  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      login: (userData: User) => {
        setIsLoggedIn(true);
        setUser(userData);
        // Simulate saving token/user data
        localStorage.setItem("authToken", "dummy-token"); // Replace with real token
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("User logged in:", userData);
      },
      logout: () => {
        setIsLoggedIn(false);
        setUser(null);
        // Simulate clearing token/user data
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        console.log("User logged out");
        // Optionally navigate to login page after logout
        // navigate('/login'); // Need useNavigate hook here if implementing inside a component
      },
    }),
    [isLoggedIn, user],
  ); // Recalculate only when isLoggedIn or user changes

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <HomeLayout /> {/* HomeLayout wraps protected pages */}
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<StoreList />} />
          <Route path="/settings" element={<ProfileSettingsPage />} />
          {/* Add other protected routes for Normal User here */}
        </Route>

        {/* Fallback Route (Optional) */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Route>,
    ),
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
