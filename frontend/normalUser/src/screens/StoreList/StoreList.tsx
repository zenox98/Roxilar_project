// src/pages/StoreList.tsx
import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { Store } from "../../types"; // Import Store interface
import StoreCard from "../../components/StoreCard/StoreCard";
import { useAuth } from "../../App"; // To get user ID if needed for API calls

// --- Mock Data (Replace with API Fetch) ---
const MOCK_STORES: Store[] = [
  {
    id: "store1",
    storeName: "Good Foods Market",
    address: "100 Main St, Anytown",
    overallRating: 4.5,
    userRating: 5,
  },
  {
    id: "store2",
    storeName: "Corner Grocer",
    address: "25 Side Ave, Anytown",
    overallRating: 3.8,
    userRating: null,
  },
  {
    id: "store3",
    storeName: "SuperMart",
    address: "500 Highway 1, Sometown",
    overallRating: 4.1,
    userRating: 4,
  },
  {
    id: "store4",
    storeName: "Fresh Produce",
    address: "75 Main St, Anytown",
    overallRating: null,
    userRating: null,
  },
  {
    id: "store5",
    storeName: "Downtown Minimart",
    address: "10 Plaza Center, Sometown",
    overallRating: 2.9,
    userRating: 3,
  },
];
// --- End Mock Data ---

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const { user } = useAuth(); // Get user info if needed

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- API Call Simulation ---
        // Replace with your actual API call to fetch stores
        // IMPORTANT: The backend API *must* return the 'userRating' field
        // specific to the currently logged-in user (e.g., pass user.id in request)
        console.log("Fetching stores for user:", user?.id);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

        // Simulate success - Use mock data for now
        setStores(MOCK_STORES);
        // --- End API Call Simulation ---
      } catch (err) {
        console.error("Failed to fetch stores:", err);
        setError("Could not load stores. Please try again later.");
        setStores([]); // Clear stores on error
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      // Only fetch if user is logged in (context has user data)
      fetchStores();
    } else {
      // Handle case where user data might not be available yet
      console.warn("User data not available for fetching stores.");
      // Optionally show loading or a message
    }
  }, [user]); // Re-fetch if user changes (though unlikely in this flow)

  // Memoized filtering logic
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const nameMatch = store.storeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const addressMatch = store.address
        .toLowerCase()
        .includes(addressFilter.toLowerCase());
      return nameMatch && addressMatch;
    });
  }, [stores, searchTerm, addressFilter]);

  // Handler for updating a store's userRating locally after submission
  // This avoids needing to refetch the entire list
  const handleRatingUpdate = (storeId: string, newRating: number | null) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, userRating: newRating } : store,
      ),
    );
    // Note: You might also want to update the overallRating if the API returns it
    // after a successful rating submission. For now, we only update userRating.
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Registered Stores
      </h1>

      {/* Search/Filter Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="search-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Name
          </label>
          <input
            type="text"
            id="search-name"
            placeholder="Enter store name..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="search-address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Address
          </label>
          <input
            type="text"
            id="search-address"
            placeholder="Enter address keyword..."
            value={addressFilter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddressFilter(e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Store List */}
      {isLoading && <div className="text-center py-10">Loading stores...</div>}
      {error && <div className="text-center py-10 text-red-600">{error}</div>}
      {!isLoading && !error && (
        <>
          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onRatingSubmitted={handleRatingUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No stores found matching your criteria.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoreList;
