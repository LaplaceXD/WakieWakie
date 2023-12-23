import SidebarCard from "@/components/messages/sidebar-card";

function Sidebar({ users, onClick, loading }) {
  return (
    <div id="card-message" className="flex w-1/4 min-w-60 flex-col items-center bg-neutral-200/20">
      {users
        .filter(user => user.status !== null)
        .map(user => (
          <SidebarCard key={user.id} user={user} onClick={onClick} loading={loading} />
        ))}
    </div>
  );
}

export default Sidebar;
