import ShimmerMessage from "@/components/shimmer/shimmer-message";

function SidebarCard({ user, onClick, loading }) {
  return (
    <>
      {loading ? (
        <ShimmerMessage />
      ) : (
        <div
          key={user.id}
          className="mt-4 flex h-16 w-11/12 cursor-pointer items-center overflow-hidden rounded-lg px-2 duration-150 ease-in-out hover:bg-neutral-200/20"
          onClick={() => onClick(user)}
        >
          <img src={user.image} alt={`User ${user.name}`} className="aspect-square h-14 rounded-full object-cover" />
          <div className="mx-3 overflow-hidden">
            <div className="truncate text-xl font-bold text-neutral-300">{user.name}</div>
            <div className="truncate text-neutral-200">{user.messages?.[user.messages.length - 1]?.text}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default SidebarCard;
