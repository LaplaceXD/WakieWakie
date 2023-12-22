import { LuBell, LuLayoutGrid, LuLightbulb, LuLogOut, LuMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-peach-200 flex flex-col justify-between">
      <div className="mt-4 flex flex-col">
        <LuBell className="text-peach-100 m-4 size-8" />
        <Link to={`/`}>
          <LuLayoutGrid className="text-peach-100 m-4 size-8" />
        </Link>
        <Link to={`/messages`}>
          <LuMessageSquare className="text-peach-100 m-4 size-8" />
        </Link>
      </div>
      <div className="mb-4 flex flex-col">
        <LuLightbulb className="text-peach-100 m-4 size-8" />
        <LuLogOut className="text-peach-100 m-4 size-8" />
      </div>
    </div>
  );
}

export default Navbar;
