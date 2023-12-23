import { useState } from "react";
import Buttons from "@/components/common/buttons";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "@/components/messages/actions/send-message";

interface DisplayInputProps {
  conversationId: string;
}

function DisplayInput({ conversationId }: DisplayInputProps) {
  const [messageContent, setMessageContent] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async () => {
    try {
      const response = await sendMessage({
        variables: { conversationId, content: messageContent },
      });

      if (response.data.sendMessage.success) {
        console.log("Message sent successfully");
        // Optionally reset the message input
        setMessageContent("");
      } else {
        console.log("Message sending failed:", response.data.sendMessage.message);
      }
    } catch (e) {
      console.error("Error sending message:", e);
    }
  };

  return (
    <div className="flex w-full items-end">
      <input
        type="text"
        name="message"
        placeholder="Aa"
        className="mr-5 h-10 w-full rounded-full border-2 border-neutral-200 bg-transparent p-4"
        value={messageContent}
        onChange={e => setMessageContent(e.target.value)}
      />
      <Buttons label="send" type="chat" onClick={handleSendMessage} isActive={true} />
    </div>
  );
}

export default DisplayInput;
