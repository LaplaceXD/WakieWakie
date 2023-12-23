import { Conversation, User } from "@/__generated__/graphql";
import { importedImages } from "@/assets/imported-images";
import SidebarConversations from "@/components/messages/sidebar-conversations";

interface SidebarProps {
  conversations: Conversation[];
  userID: string;
  handleCardClick: (_: User, __: string, ___?: string) => void;
}

function Sidebar({ conversations, userID, handleCardClick }: SidebarProps) {
  return (
    <div id="card-message" className="flex w-1/4 min-w-60 flex-col bg-neutral-200/30">
      {conversations?.map((conversation, index) => (
        <SidebarConversations
          key={index}
          conversation={conversation}
          userID={userID}
          image={importedImages[index % importedImages.length]}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default Sidebar;
