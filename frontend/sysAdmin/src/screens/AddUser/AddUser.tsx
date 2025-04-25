import { useState, ChangeEvent, FormEvent } from "react";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  address: string;
}

export default function AddUser() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  // State for submission feedback (optional)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // Generic handler for input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Use computed property name to update the correct field
    }));
    // Clear previous submission message when user starts typing again
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  // Handler for form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)
    setIsSubmitting(true);
    setSubmitMessage(null); // Clear previous message

    // --- Simulate API Call ---
    // In a real application, you would send formData to your backend API here
    console.log("Submitting User Data:", formData);

    // Simulate network delay
    setTimeout(() => {
      // --- Handle Response (Simulated) ---
      const isSuccess = Math.random() > 0.2; // Simulate success/failure randomly

      if (isSuccess) {
        console.log("User added successfully!");
        setSubmitMessage("User registered successfully!");
        // Optionally reset the form after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
        });
      } else {
        console.error("Failed to add user.");
        setSubmitMessage("Error: Could not register user. Please try again.");
      }

      setIsSubmitting(false); // Re-enable the form
    }, 1500); // Simulate 1.5 second delay
  };

  return (
    <div className="w-full h-dvh flex flex-wrap flex-col justify-self-center items-start max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Register New User
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name" // 'name' attribute must match the key in UserFormData
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6} // Example basic validation
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Address Field */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Submission Feedback */}
        {submitMessage && (
          <div
            className={`p-3 rounded-md text-sm ${submitMessage.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
              }`}
          >
            {submitMessage}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isSubmitting
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              } transition duration-150 ease-in-out`}
          >
            {isSubmitting ? "Registering..." : "Register User"}
          </button>
        </div>
      </form>
    </div>
  );
}
