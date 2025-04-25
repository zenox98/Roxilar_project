import { Outlet } from "react-router";
import Header from "../../components/Header/Header";

export default function HomeLayout() {
  return (
    <div className="w-full h-screen flex flex-wrap flex-row justify-between items-center">
      {/* side tab */}
      <Header />

      {/* mainscreen */}
      <div className="h-auto w-full flex flex-wrap justify-between items-start">
        <Outlet />
      </div>
    </div>
  );
}
