import { Conversation, User } from "@/__generated__/graphql";

interface SidebarConversationsProps {
  conversation: Conversation;
  userID: string;
  image?: string;
  handleCardClick: (_: User, __: string, ___?: string) => void;
}

function SidebarConversations({ conversation, userID, image, handleCardClick }: SidebarConversationsProps) {
  const otherUser = conversation.users.find(user => user.id !== userID);
  return otherUser ? (
    <div
      onClick={() => handleCardClick(otherUser, conversation.id, image)}
      className="mx-2 mt-2 flex items-center rounded-lg p-2 hover:bg-neutral-100/70"
    >
      <img
        src={image}
        alt={`User ${otherUser.firstName} ${otherUser.lastName}`}
        className="aspect-square h-12 rounded-full object-cover"
      />
      <div className="ml-3 overflow-hidden">
        <div className="text-md truncate font-bold text-neutral-300">
          {otherUser.firstName} {otherUser.lastName}
        </div>
        <span className="text-sm text-neutral-200">
          {conversation.recentMessage ? (
            <>
              {conversation.recentMessage.sender?.id !== otherUser.id && <span>You: </span>}
              {conversation.recentMessage.content}
            </>
          ) : null}
        </span>
      </div>
    </div>
  ) : null;
}

export default SidebarConversations;
