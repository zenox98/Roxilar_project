import { Link } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UserData {
  id: number; // Using index as key for now, but ID is better
  name: string;
  email: string;
  password: string; // SECURITY WARNING!
  address: string;
  role: "User" | "Store Owner"; // Define possible roles
}

export default function ListOfUsers() {
  // Sample data - **Added 'role' property**
  // In a real app, this data would come from state/API
  const data = [
    {
      name: "john",
      email: "john@example.com", // Used example.com for validity
      password: "1234",
      address: "New York",
      role: "Store Owner", // User who registered a store
    },
    {
      name: "jane",
      email: "jane@example.com",
      password: "1234",
      address: "New York",
      role: "User", // Simple user
    },
    {
      name: "joe",
      email: "joe@example.com",
      password: "1234",
      address: "New York",
      role: "User",
    },
    {
      name: "alice", // Added more distinct data
      email: "alice@example.com",
      password: "5678",
      address: "Chicago",
      role: "Store Owner",
    },
    {
      name: "bob", // Added more distinct data
      email: "bob@example.com",
      password: "abcd",
      address: "Los Angeles",
      role: "User",
    },
  ];

  // In a real application, you would fetch this data:
  // const [users, setUsers] = useState<UserData[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => { /* Fetch data here */ }, []);
  // const dataToDisplay = users;

  // Using sample data for now:
  const dataToDisplay = data;

  return (
    <div className="w-full min-h-dvh flex flex-col items-center px-4 py-8 bg-gray-50">
      {/* Changed Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      {/* Control Section - Changed Link */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-4 mb-6 flex justify-start items-center">
        {/* Ensure '/AddUser' is the correct route for your add user form/page */}
        <Link
          to="/AddUser" // Update this route if necessary
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out text-sm font-medium"
        >
          + Add User
        </Link>
      </div>

      {/* User List Table */}
      <div className="w-full max-w-6xl overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
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
              {/* Added Role Header */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              {/* Optional: Add an actions column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataToDisplay.length > 0 ? (
              dataToDisplay.map((item, index) => (
                // Using index as key is okay for static lists, but an item.id is preferred
                <tr
                  key={index} // Ideally use item.id if available
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-mono italic">
                    {/* !!! SECURITY WARNING !!! */}
                    ********
                    {/* Displaying passwords is very insecure. */}
                    {/* {item.password}  <- Avoid this */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.address}
                  </td>
                  {/* Added Role Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {/* Styling the role with badges */}
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.role === "Store Owner"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>

                  {/* Optional: Actions like Edit/Delete */}
                  <td className="px-6 py-4 whitespace-nowrap align-middle text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {/* Updated colspan to 5 */}
                <td
                  colSpan={5} // Adjusted colspan for the new column
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
