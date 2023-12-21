import { Outlet } from "react-router-dom";

import Navbar from "./navbar";

export default function Layout() {
  return (
    <div className="flex h-screen ">
      <Navbar />
      <div className="detail w-screen bg-neutral-100">
          <Outlet />
      </div>
    </div>
  );
}
