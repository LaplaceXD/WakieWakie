import { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";

import Display from "@/components/messages/message-display/display";
import TextDisplay from "@/components/common/text-display";
import ShimmerSidebar from "@/components/common/shimmer/shimmer-sidebar";
import Sidebar from "@/components/messages/sidebar";

import { GET_CONVERSATIONS } from "@/components/messages/actions/get-conversations";
import { CHECK_USER } from "@/components/actions/check-user";
import { USER_MESSAGE_SUBSCRIPTION } from "@/components/messages/actions/userMessage-subscription";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const { loading, data: conversationsData } = useQuery(GET_CONVERSATIONS, {
    variables: { limit: 10, offset: 0 },
  });
  const { data: userData } = useQuery(CHECK_USER);

  const userID = userData?.me?.id;

  const { data: subscriptionData } = useSubscription(USER_MESSAGE_SUBSCRIPTION, {
    variables: { excludeIds: userID },
  });

  // Function to sort conversations
  const sortConversations = conversations => {
    return conversations.slice().sort((a, b) => {
      const sentAtA = a.recentMessage?.sentAt;
      const sentAtB = b.recentMessage?.sentAt;
      if (!sentAtA && !sentAtB) {
        return 0;
      }
      if (!sentAtA) {
        return 1;
      }
      if (!sentAtB) {
        return -1;
      }
      return sentAtB.localeCompare(sentAtA);
    });
  };

  // Update conversations with initial data
  useEffect(() => {
    if (conversationsData && conversationsData.conversations) {
      setConversations(sortConversations(conversationsData.conversations));
    }
  }, [conversationsData]);

  // Update conversations with subscription data
  useEffect(() => {
    if (subscriptionData && subscriptionData.userMessages) {
      const newMessage = subscriptionData.userMessages.message;
      const newConversationId = newMessage.conversationId;

      setConversations(prevConversations => {
        const conversationIndex = prevConversations.findIndex(conversation => conversation.id === newConversationId);

        let updatedConversations;
        if (conversationIndex >= 0) {
          updatedConversations = [...prevConversations];
          updatedConversations[conversationIndex] = {
            ...updatedConversations[conversationIndex],
            recentMessage: newMessage,
          };
        } else {
          updatedConversations = [newMessage, ...prevConversations];
        }

        return sortConversations(updatedConversations);
      });
    }
  }, [subscriptionData]);

  // Handler for conversation card clicks
  const handleCardClick = (user, conversationID, image) => {
    setSelectedMessage(<Display user={user} conversationID={conversationID} image={image} />);
  };

  // Default message display
  const defaultMessage = (
    <TextDisplay
      TitleLabel="Select a chat"
      TextLabel="Pick your Wakie Wakie match to chat with"
      style="h-full justify-center"
    />
  );
  const [selectedMessage, setSelectedMessage] = useState(defaultMessage);

  return (
    <>
      {loading && <ShimmerSidebar />}
      {!loading && (
        <div className="flex h-screen w-screen">
          <Sidebar conversations={conversations} userID={userID} handleCardClick={handleCardClick} />
          <div className="w-full bg-neutral-100">{selectedMessage}</div>
        </div>
      )}
    </>
  );
}

export default Messages;
