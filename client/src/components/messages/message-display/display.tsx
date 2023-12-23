import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import DisplayUser from "@/components/messages/message-display/display-user";
import DisplayMessages from "@/components/messages/message-display/display-messages";
import DisplayHeader from "./display-header";
import DisplayInput from "./display-input";

import { GET_MESSAGES } from "@/components/messages/actions/get-messages";
import { CONVERSATION_MESSAGES_SUBSCRIPTION } from "@/components/messages/actions/conversationMessages-subscription";

function Display({ user, conversationID, image }) {
  const [displayUser, setDisplayUser] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { loading, error, data, refetch, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: { conversationId: conversationID, limit: 100, offset: 0 },
  });

  useEffect(() => {
    const cleanUp = refetch({ conversationId: conversationID, limit: 100, offset: 0 })
      .then(() => {
        return subscribeToMore({
          document: CONVERSATION_MESSAGES_SUBSCRIPTION,
          variables: { conversationId: conversationID },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { conversationMessages } = subscriptionData.data;
            return {
              messages: [conversationMessages.message, ...(prev.messages || [])],
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
  }, [conversationID]);

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
  const formatTime = isoString => {
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
      <div className="flex-grow overflow-y-auto px-6 flex flex-col-reverse" ref={messagesContainerRef}>
        {data?.messages .map((message, index) => (
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
