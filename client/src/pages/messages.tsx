import MessageSidebar from "@/components/message-sidebar";
import MessageDisplay from "@/components/message-display";

export default function Messages() {
  return (
    <div className="flex h-screen w-screen">
      <MessageSidebar />
      <MessageDisplay />
    </div>
  );
}
