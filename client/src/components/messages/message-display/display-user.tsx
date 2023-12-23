function DisplayUser({ user, displayUser }) {
  return (
    <div
      className="flex flex-col items-center bg-neutral-200/20"
      style={{ transition: `width ease-in-out 150ms`, width: !displayUser ? "0px" : "40%" }}
    >
      {displayUser && (
        <>
          <img
            src={user.image}
            alt={`User ${user.name}`}
            className="mr-2 mt-8 aspect-square h-1/6 rounded-full object-cover"
          />
          <span className="mt-2 text-xl font-bold">{user.name}</span>
          <span className="text-md text-neutral-200">Active Now</span>
        </>
      )}
    </div>
  );
}

export default DisplayUser;
