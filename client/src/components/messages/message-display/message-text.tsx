import { useState } from "react";
import MessageModal from "@/components/messages/message-display/message-modal";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import { MessagesQuery } from "@/__generated__/graphql";

interface MessageTextProps {
  content: string;
  messageId: string;
  refetchMessages: (_?: Partial<OperationVariables>) => Promise<ApolloQueryResult<MessagesQuery>>;
}

function MessageText({ content, messageId, refetchMessages }: MessageTextProps) {
  const [modalState, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  return (
    <>
      <span
        className="rounded-full bg-neutral-200/30 px-4 py-2 delay-100 duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:bg-neutral-200/50"
        onClick={openModal}
      >
        {content}
      </span>
      {modalState && (
        <MessageModal
          closeModal={closeModal}
          content={content}
          messageId={messageId}
          refetchMessages={refetchMessages}
        />
      )}
    </>
  );
}

export default MessageText;
