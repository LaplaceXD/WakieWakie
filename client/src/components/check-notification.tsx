import { LuCheck } from "react-icons/lu";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ACCEPT_CONVERSATION } from "@/components/actions/accept-conversation";
import { SEEN_NOTIFICATIONS } from "@/components/actions/seen-notification";
import { GET_CONVERSATIONS } from "@/components/messages/actions/get-conversations";

function CheckNotification({ convoID, notifID, onClick }) {
  const navigate = useNavigate();

  const [acceptConversation] = useMutation(ACCEPT_CONVERSATION);
  const [seenNotification] = useMutation(SEEN_NOTIFICATIONS);

  const { loading, data: convo } = useQuery(GET_CONVERSATIONS, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  const handleAcceptConversation = async () => {
    try {
      const matchingConversation = convo.conversations.find(conversation => conversation.id === convoID);

      if (!matchingConversation) {
        console.error("Conversation not found");
        return;
      }

      if (matchingConversation.type === "MATCH") {
        const seenResponse = await seenNotification({
          variables: {
            seenNotificationId: notifID,
          },
        });
        if (seenResponse.data.seenNotification.success) {
          toast.success("Notification marked as seen");
        } else {
          toast.error(seenResponse.data.seenNotification.message);
        }

        if (onClick) {
          onClick();
        }

        navigate("/messages");
        window.location.reload();
      } else {
        const response = await acceptConversation({
          variables: {
            conversationId: convoID,
          },
        });
        if (response.data.acceptConversation.success) {
          toast.success(response.data.acceptConversation.message);

          const seenResponse = await seenNotification({
            variables: {
              seenNotificationId: notifID,
            },
          });
          if (seenResponse.data.seenNotification.success) {
            toast.success("Notification marked as seen");
          } else {
            toast.error(seenResponse.data.seenNotification.message);
          }

          if (onClick) {
            onClick();
          }

          navigate("/messages");
          window.location.reload();
        } else {
          toast.error(response.data.acceptConversation.message);
        }
      }
    } catch (error) {
      console.error("Error accepting conversation:", error);
    }
  };

  return (
    <div
      className="flex aspect-square size-8 items-center justify-center rounded-full border-2 border-pink-200 duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-pink-200"
      onClick={handleAcceptConversation}
    >
      <LuCheck className="size-6 text-pink-200 duration-150 ease-in-out hover:text-neutral-100" />
    </div>
  );
}

export default CheckNotification;
