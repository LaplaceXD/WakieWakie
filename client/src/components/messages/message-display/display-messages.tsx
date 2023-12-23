import MessageText from "@/components/messages/message-display/message-text";

function DisplayMessages({ index, senderId, userId, image, content, sentAt, messageId, refetchMessages }) {
  return (
    <div key={index} className={`mt-3 flex w-full items-center ${senderId !== userId ? "justify-end" : ""}`}>
      {senderId === userId && (
        <>
          <img src={image} alt="User" className="mr-2 size-8 rounded-full bg-neutral-200/30" />
          <MessageText content={content} messageId={messageId} refetchMessages={refetchMessages} />
          <span className="ml-2 text-xs text-neutral-200/50">{sentAt}</span>
        </>
      )}
      {senderId !== userId && (
        <>
          <span className="mr-2 text-xs text-neutral-200/50">{sentAt}</span>
          <MessageText content={content} messageId={messageId} refetchMessages={refetchMessages} />
        </>
      )}
    </div>
  );
}

export default DisplayMessages;
