import { LuBell, LuLayoutGrid, LuLightbulb, LuLogOut, LuMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar flex flex-col justify-between bg-peach-200">
      <div className="mt-4 flex flex-col">
        <LuBell className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
        <Link to={`/`}>
          <LuLayoutGrid className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
        </Link>
        <Link to={`/messages`}>
          <LuMessageSquare className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
        </Link>
      </div>
      <div className="mb-4 flex flex-col">
        <LuLightbulb className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
        <LuLogOut className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
      </div>
    </div>
  );
}

export default Navbar;
