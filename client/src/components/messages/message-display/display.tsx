import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { User, MessagesQuery, SubscriptionSubscription } from "@/__generated__/graphql";

import DisplayUser from "@/components/messages/message-display/display-user";
import DisplayMessages from "@/components/messages/message-display/display-messages";
import DisplayHeader from "./display-header";
import DisplayInput from "./display-input";

import { GET_MESSAGES } from "@/components/messages/actions/get-messages";
import { CONVERSATION_MESSAGES_SUBSCRIPTION } from "@/components/messages/actions/conversationMessages-subscription";

interface DisplayProps {
  user: User;
  conversationID: string;
  image?: string;
}

function Display({ user, conversationID, image }: DisplayProps) {
  const [displayUser, setDisplayUser] = useState(false);
  const messagesContainerRef = useRef(null);

  const { loading, data, refetch, subscribeToMore } = useQuery<MessagesQuery>(GET_MESSAGES, {
    variables: { conversationId: conversationID, limit: 100, offset: 0 },
  });

  useEffect(() => {
    const cleanUp = refetch({ conversationId: conversationID, limit: 100, offset: 0 })
      .then(() => {
        return subscribeToMore<SubscriptionSubscription>({
          document: CONVERSATION_MESSAGES_SUBSCRIPTION,
          variables: { conversationId: conversationID },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            return {
              messages: [subscriptionData!.data!.conversationMessages!.message, ...(prev.messages || [])],
            };
          },
        });
      })
      .catch(() => {});
    return () => {
      cleanUp
        .then(fn => {
          fn && fn();
        })
        .catch(() => {});
    };
  }, [conversationID, refetch, subscribeToMore]);

  // const scrollToBottom = () => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  //
  // useEffect(() => {
  //   scrollToBottom();
  // }, [data?.messages]);

  // const sortedMessages = loading ? [] : [...(data?.messages || [])].reverse();
  const toggleDisplayUser = () => {
    setDisplayUser(!displayUser);
  };
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return loading ? (
    <div className="flex h-screen animate-pulse flex-col justify-between">
      <div className="flex w-full p-4 shadow-md">
        <div className="mr-2 aspect-square h-20 rounded-full bg-neutral-200/30 object-cover"></div>
      </div>
    </div>
  ) : (
    <div className="flex h-full flex-col ">
      <DisplayHeader user={user} image={image} toggleDisplayUser={toggleDisplayUser} />
      <div className="flex flex-grow flex-col-reverse overflow-y-auto px-6" ref={messagesContainerRef}>
        {data?.messages.map((message, index) => (
          <DisplayMessages
            key={index}
            image={image}
            index={index}
            content={message.content}
            senderId={message.sender.id}
            sentAt={formatTime(message.sentAt)}
            userId={user.id}
            messageId={message.id}
            refetchMessages={refetch}
          />
        ))}
        {/*<div ref={messagesEndRef} />*/}
      </div>
      <div className="p-4">
        <DisplayInput conversationId={conversationID} />
      </div>
      {displayUser && <DisplayUser user={user} image={image} displayUser={displayUser} />}
    </div>
  );
}

export default Display;
