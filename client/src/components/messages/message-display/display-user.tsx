function DisplayUser({ user, image, displayUser }) {
  return (
    <div
      className="flex flex-col items-center bg-neutral-200/20"
      style={{ transition: "width ease-in-out 150ms", width: displayUser ? "40%" : "0px" }}
    >
      <img src={image} alt={`User ${user.name}`} className="mr-2 mt-8 aspect-square h-1/6 rounded-full object-cover" />
      <span className="mt-2 text-xl font-bold">
        {user.firstName} {user.lastName}
      </span>
      <span className="text-md text-neutral-200">Active Now</span>
    </div>
  );
}

export default DisplayUser;
