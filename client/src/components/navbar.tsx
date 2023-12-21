import { LuBell, LuLayoutGrid, LuLightbulb, LuLogOut, LuMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-peach-200 md:flex">
      <div className="my-4 flex flex-col justify-between">
        <div className="flex flex-col">
          <LuBell className="m-4 size-10 text-peach-100" />
          <Link to={`/`}>
            <LuLayoutGrid className="m-4 size-10 text-peach-100" />
          </Link>
          <Link to={`/messages`}>
            <LuMessageSquare className="m-4 size-10 text-peach-100" />
          </Link>
        </div>
        <div className="flex flex-col">
          <LuLightbulb className="m-4 size-10 text-peach-100" />
          <LuLogOut className="m-4 size-10 text-peach-100" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
