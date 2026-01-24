import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen max-w-[100vw]  md:flex">
      <div className="relative md:fixed md:w-50 lg:max-w-[256px]">
        <Sidebar />
      </div>
      <main className="w-full md:pl-50 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
