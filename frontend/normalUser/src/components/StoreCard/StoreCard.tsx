// src/components/StoreCard.tsx
import React, { useState } from "react";
import { Store } from "../../types"; // Import Store interface
import RatingInput from "../RatingInput/RatingInput"; // Import RatingInput component
import { useAuth } from "../../App"; // To get user ID for API calls

interface StoreCardProps {
  store: Store;
  onRatingSubmitted: (storeId: string, newRating: number | null) => void; // Callback to update list
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onRatingSubmitted }) => {
  const { user } = useAuth();
  const [currentRating, setCurrentRating] = useState<number | null>(
    store.userRating,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
    setSubmitError(null); // Clear previous messages when rating changes
    setSubmitSuccess(false);
  };

  const handleSubmitRating = async () => {
    if (currentRating === null) {
      setSubmitError("Please select a rating first.");
      return;
    }
    if (!user) {
      setSubmitError("User not logged in."); // Should ideally not happen here
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // --- API Call Simulation ---
    console.log(
      `Submitting rating for store ${store.id}: User ${user.id} rates ${currentRating}`,
    );
    try {
      // Replace with your actual API call to submit/update rating
      // Send { userId: user.id, storeId: store.id, rating: currentRating }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      // Simulate Success
      console.log("Rating submitted successfully!");
      setSubmitSuccess(true);
      // Notify parent component to update the local state immediately
      onRatingSubmitted(store.id, currentRating);
      // Optionally clear success message after a few seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to submit rating:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Could not submit rating.",
      );
      // Optionally revert optimistic UI update if needed
      // setCurrentRating(store.userRating); // Revert if API failed
      // onRatingSubmitted(store.id, store.userRating);
    } finally {
      setIsSubmitting(false);
    }
    // --- End API Call Simulation ---
  };

  // Function to maybe clear rating (optional)
  // const handleClearRating = async () => { /* API call to delete rating */ }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {store.storeName}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{store.address}</p>

        {/* Overall Rating */}
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Overall Rating:
          </span>
          {store.overallRating !== null ? (
            <span className="text-yellow-500 font-bold flex items-center">
              {/* Basic Star Icon Placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {store.overallRating.toFixed(1)} / 5
            </span>
          ) : (
            <span className="text-sm text-gray-500 italic">Not yet rated</span>
          )}
        </div>

        {/* User's Rating Section */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Your Rating:</p>
          <RatingInput
            currentRating={currentRating}
            onChange={handleRatingChange}
            disabled={isSubmitting}
          />
          {currentRating !== null && (
            <button
              onClick={handleSubmitRating}
              disabled={isSubmitting || currentRating === store.userRating} // Disable if unchanged
              className={`mt-3 w-full py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out ${isSubmitting
                  ? "bg-indigo-300 cursor-not-allowed"
                  : currentRating === store.userRating
                    ? "bg-gray-400 cursor-not-allowed" // Style for unchanged rating
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
            >
              {isSubmitting
                ? "Submitting..."
                : store.userRating === null
                  ? "Submit Rating"
                  : "Update Rating"}
            </button>
          )}
          {submitError && (
            <p className="text-xs text-red-600 mt-2">{submitError}</p>
          )}
          {submitSuccess && (
            <p className="text-xs text-green-600 mt-2">
              Rating submitted successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
