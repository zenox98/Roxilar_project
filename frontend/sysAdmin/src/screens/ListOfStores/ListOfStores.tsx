import React from "react";
import { Link } from "react-router"; // Assuming you use react-router-dom

// Define an interface for the store data shape
interface StoreData {
  id: number; // Added an ID for a better key
  storeName: string;
  owner: string;
  email: string;
  password: string; // Warning: Displaying passwords is a security risk!
  address: string;
}

// Sample data (replace with data fetched from your API or state management)
const storeData: StoreData[] = [
  {
    id: 1,
    storeName: "SuperMart Downtown",
    owner: "Alice Smith",
    email: "alice.store@example.com",
    password: "storePassword1", // SECURITY WARNING: Avoid storing/displaying plain text passwords
    address: "123 Main St, Anytown",
  },
  {
    id: 2,
    storeName: "Corner Groceries",
    owner: "Bob Johnson",
    email: "bob.corner@example.com",
    password: "groceryPass45", // SECURITY WARNING: Avoid storing/displaying plain text passwords
    address: "456 Oak Ave, Anytown",
  },
  {
    id: 3,
    storeName: "Tech Hub",
    owner: "Charlie Lee",
    email: "charlie.tech@example.com",
    password: "techSecure!", // SECURITY WARNING: Avoid storing/displaying plain text passwords
    address: "789 Pine Ln, Anytown",
  },
  {
    id: 4,
    storeName: "Books & Nooks",
    owner: "Diana Ross",
    email: "diana.books@example.com",
    password: "readMore#99", // SECURITY WARNING: Avoid storing/displaying plain text passwords
    address: "101 Bookworm Rd, Anytown",
  },
];

const ListOfStore: React.FC = () => {
  // In a real application, you would likely fetch this data using useEffect and useState
  // const [stores, setStores] = useState<StoreData[]>([]);
  // useEffect(() => {
  //   // Fetch data from API
  //   // fetch('/api/stores').then(res => res.json()).then(data => setStores(data));
  // }, []);
  // const dataToDisplay = stores; // Use fetched data

  // Using sample data for now:
  const dataToDisplay = storeData;

  return (
    <div className="w-full min-h-dvh flex flex-col items-center px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Store Management
      </h1>

      {/* Control Section */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6 flex justify-start items-center">
        {/* Ensure '/AddStore' is the correct route for your add store form/page */}
        <Link
          to="/AddStore" // Update this route if necessary
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out text-sm font-medium"
        >
          + Add Store
        </Link>
      </div>

      {/* Store List Table */}
      <div className="w-full max-w-5xl overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {/* Adjusted padding and text alignment for better readability */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              {/* Optional: Add an actions column */}
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Actions
               </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataToDisplay.length > 0 ? (
              dataToDisplay.map((store) => (
                // Use a unique ID from the data for the key if possible
                <tr
                  key={store.id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {store.storeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {store.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {store.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-mono italic">
                    {/* !!! SECURITY WARNING !!! */}
                    {/* Displaying passwords is very insecure. Consider removing this column */}
                    {/* Or display '********' */}
                    ********
                    {/* {store.password}  <- Avoid this */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {store.address}
                  </td>
                  {/* Optional: Actions like Edit/Delete */}
                  {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                   </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfStore;
