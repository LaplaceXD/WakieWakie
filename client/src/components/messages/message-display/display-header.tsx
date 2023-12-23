import { LuMoreVertical } from "react-icons/lu";

function DisplayHeader({ user, toggleDisplayUser }) {
  return (
    <div
      id="display-header"
      className="flex w-full items-center justify-between p-4 shadow-md"
      style={{ transition: `width ease-in-out 200ms` }}
    >
      <div className="flex items-center">
        <img src={user.image} alt={`User ${user.name}`} className="mr-2 aspect-square h-20 rounded-full object-cover" />
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-neutral-300">{user.name}</div>
          <div className="text-neutral-200">Active now</div>
        </div>
      </div>
      <LuMoreVertical
        className="size-8 text-pink-100 duration-150 ease-in-out hover:text-pink-200"
        onClick={toggleDisplayUser}
      />
    </div>
  );
}

export default DisplayHeader;
