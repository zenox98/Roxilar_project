import React, { useState, useEffect } from "react";

// Interface for the statistics data (optional but good practice)
interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

const Dashboard: React.FC = () => {
  // State to hold the dashboard numbers
  // Initialize with 0 or loading indicators
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  // State for loading status (optional)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate fetching data when the component mounts
  useEffect(() => {
    // --- Replace this with your actual data fetching logic ---
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Simulate fetched data
      const fetchedStats: DashboardStats = {
        totalUsers: 152, // Example data
        totalStores: 48, // Example data
        totalRatings: 876, // Example data
      };

      setStats(fetchedStats);
      setIsLoading(false);
    };

    fetchData();
    // --- End of simulation ---

    // Cleanup function if needed (e.g., cancel fetch requests)
    // return () => {};
  }, []); // Empty dependency array ensures this runs only once on mount

  // Helper component for individual stat boxes (optional, for cleaner code)
  const StatBox: React.FC<{
    title: string;
    value: number;
    isLoading: boolean;
    colorClass?: string;
  }> = ({
    title,
    value,
    isLoading,
    colorClass = "text-indigo-600", // Default color
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center transition-all duration-300 ease-in-out min-w-[200px]">
      <h2 className="text-lg font-semibold text-gray-500 mb-2">{title}</h2>
      {isLoading ? (
        <div className="h-10 bg-gray-300 rounded animate-pulse w-1/2 mx-auto"></div>
      ) : (
        <p className={`text-4xl font-bold ${colorClass}`}>
          {value.toLocaleString()}
        </p>
      )}
    </div>
  );

  return (
    // Main container - centers content, adds padding, background
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Grid layout for stat boxes - responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Stat Box 1: Users */}
        <StatBox
          title="Total Users"
          value={stats.totalUsers}
          isLoading={isLoading}
          colorClass="text-blue-600"
        />

        {/* Stat Box 2: Stores */}
        <StatBox
          title="Total Stores"
          value={stats.totalStores}
          isLoading={isLoading}
          colorClass="text-green-600"
        />

        {/* Stat Box 3: Ratings */}
        <StatBox
          title="Total Submitted Ratings"
          value={stats.totalRatings}
          isLoading={isLoading}
          colorClass="text-purple-600"
        />
      </div>

      {/* You can add more sections to the dashboard below */}
      {/* <div className="mt-10 w-full max-w-5xl">
             <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
             <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                 {/* Placeholder for charts or tables */}
      {/*     </div>
        // </div> */}
    </div>
  );
};

export default Dashboard;
