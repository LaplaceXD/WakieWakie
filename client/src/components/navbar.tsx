import { Link } from "react-router-dom";
import { LuMessageSquare, LuBell, LuLayoutGrid, LuLightbulb, LuLogOut } from "react-icons/lu";

export default function Navbar() {
  return (
    <div className="navbar bg-peach-200 md:flex">
      <div className="my-4 flex flex-col justify-between">
        <div className="flex flex-col">
          <LuBell className="text-peach-100 m-4 size-10" />
          <Link to={`/`}>
            <LuLayoutGrid className="text-peach-100 m-4 size-10" />
          </Link>
          <Link to={`/messages`}>
            <LuMessageSquare className="text-peach-100 m-4 size-10" />
          </Link>
        </div>
        <div className="flex flex-col">
          <LuLightbulb className="text-peach-100 m-4 size-10" />
          <LuLogOut className="text-peach-100 m-4 size-10" />
        </div>
      </div>
    </div>
  );
}
