import { Outlet } from "react-router-dom";

import Navbar from "./navbar";

function Layout() {
  return (
    <div className="flex h-screen ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
