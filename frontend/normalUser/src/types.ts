
export interface User {
  id: string; // Or number
  name: string;
  email: string;
  address: string;
  role: 'Normal User' | 'Store Owner' | 'System Administrator';
  // Add other relevant fields if needed
}

export interface Store {
  id: string; // Or number
  storeName: string;
  address: string;
  overallRating: number | null; // Average rating from all users (e.g., 3.7)
  userRating: number | null;    // Rating submitted by the *current* logged-in user (e.g., 4)
}

// Add other interfaces as needed (e.g., for API responses)
