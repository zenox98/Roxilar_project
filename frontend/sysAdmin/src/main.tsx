import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

// layouts
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import ListOfUsers from "./screens/ListOfUsers/ListOfUsers";
import ListOfStores from "./screens/ListOfStores/ListOfStores";
import ListOfRatings from "./screens/ListOfRating/ListOfRating";
import Dashboard from "./screens/DashBoard/Dashboard";
import AddUser from "./screens/AddUser/AddUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/ListOfUsers" element={<ListOfUsers />} />
        <Route path="/AddUser" element={<AddUser />} />
        
        <Route path="/ListOfStores" element={<ListOfStores />} />
        <Route path="/ListOfRatings" element={<ListOfRatings />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
