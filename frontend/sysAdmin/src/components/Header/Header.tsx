import { NavLink } from "react-router";

export default function Header() {
  return (
    <nav className="border border-black w-full pl-12 py-2 flex flex-wrap flex-col justify-center items-start">
      <ul className="w-auto h-auto flex flex-wrap justify-between items-center">
        <li className="text-xl mx-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl ${isActive ? "text-sky-600" : "text-gray-600"}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="text-xl mx-2">
          <NavLink
            to="/ListOfUsers"
            className={({ isActive }) =>
              `text-xl ${isActive ? "text-sky-600" : "text-gray-600"}`
            }
          >
            List of User
          </NavLink>
        </li>
        <li className="text-xl mx-2">
          <NavLink
            to="/ListOfStores"
            className={({ isActive }) =>
              `text-xl ${isActive ? "text-sky-600" : "text-gray-600"}`
            }
          >
            List of Stores
          </NavLink>
        </li>
        <li className="text-xl mx-2">
          <NavLink
            to="/ListOfRatings"
            className={({ isActive }) =>
              `text-xl ${isActive ? "text-sky-600" : "text-gray-600"}`
            }
          >
            List of Ratings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
