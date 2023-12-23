import React from "react";
import { importedImages } from "@/assets/imported-images";
import SidebarConversations from "@/components/messages/sidebar-conversations";

function Sidebar({ conversations, userID, handleCardClick }) {
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
