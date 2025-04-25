// src/pages/ProfileSettingsPage.tsx
import React, { useState, FormEvent } from "react";
import { useAuth } from "../../App"; // To get user info if needed

const ProfileSettingsPage: React.FC = () => {
  const { user } = useAuth(); // Get current user info
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password cannot be the same as the current password.");
      return;
    }

    setIsLoading(true);

    // --- API Call Simulation ---
    console.log(`Updating password for user: ${user?.email}`);
    try {
      // Replace with your actual API call to update password
      // Send { userId: user.id, currentPassword, newPassword } to backend
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

      // --- Mock API Response Handling ---
      console.log("Password updated successfully!");
      setSuccessMessage("Password updated successfully.");
      // Clear form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error("Password update failed:", err);
      // Handle specific errors from backend (e.g., incorrect current password)
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
    // --- End API Call Simulation ---
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Profile Settings
      </h1>

      {/* Display some user info (Read-only) */}
      <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Your Information
        </h2>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Name:</span> {user?.name ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {user?.email ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Address:</span> {user?.address ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Role:</span> {user?.role ?? "N/A"}
        </p>
      </div>

      {/* Update Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 border-t pt-4">
          Update Password
        </h2>
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

        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              ${isLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              } transition duration-150 ease-in-out`}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsPage;
