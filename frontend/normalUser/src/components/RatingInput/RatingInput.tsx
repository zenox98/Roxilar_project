// src/components/RatingInput.tsx
import React from "react";

interface RatingInputProps {
  currentRating: number | null;
  onChange: (rating: number) => void;
  disabled?: boolean;
}

const RatingInput: React.FC<RatingInputProps> = ({
  currentRating,
  onChange,
  disabled = false,
}) => {
  const totalStars = 5;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type="button" // Prevent form submission if inside a form
            onClick={() => !disabled && onChange(ratingValue)}
            onMouseEnter={() => {
              /* Optional: hover effect state */
            }}
            onMouseLeave={() => {
              /* Optional: hover effect state */
            }}
            disabled={disabled}
            className={`
              w-7 h-7 transition-colors duration-150 ease-in-out focus:outline-none
              ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            `}
            aria-label={`Rate ${ratingValue} out of ${totalStars}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`
                w-full h-full
                ${ratingValue <= (currentRating ?? 0)
                  ? "text-yellow-400" // Filled star color
                  : "text-gray-300" // Empty star color
                }
                ${!disabled && ratingValue <= (currentRating ?? 0) ? "hover:text-yellow-500" : ""}
                ${!disabled && ratingValue > (currentRating ?? 0) ? "hover:text-yellow-300" : ""}
              `}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default RatingInput;
