import { useState } from "react";
import Modal from "@/components/common/modal";
import IconButtons from "@/components/common/icon-buttons";
import { LuTrash2, LuX, LuCheck } from "react-icons/lu";
import { useMutation } from "@apollo/client";
import { DELETE_MESSAGE } from "@/components/messages/actions/delete-message";
import { toast } from "react-toastify";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import { MessagesQuery } from "@/__generated__/graphql";

interface MessageModalProps {
  closeModal: () => void;
  content: string;
  messageId: string;
  refetchMessages: (_?: Partial<OperationVariables>) => Promise<ApolloQueryResult<MessagesQuery>>;
}

function MessageModal({ closeModal, content, messageId, refetchMessages }: MessageModalProps) {
  const [displayContent, setDisplayContent] = useState("default");

  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const deleteHandler = async () => {
    try {
      const response = await deleteMessage({ variables: { messageId } });
      const result = response.data.deleteMessage;
      if (result.success) {
        console.log("Deletion successful:", result);
        toast.success("Message deleted successfully.");
        closeModal();
        refetchMessages();
      } else {
        console.log("Deletion failed:", result);
        toast.error("Failed to delete the message.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("An error occurred: " + (error as Error).message);
    }
  };

  const deleteDisplay = () => {
    setDisplayContent("delete");
  };

  return (
    <Modal onClickOutside={closeModal}>
      <div className="flex flex-col items-center">
        <span className="mb-5 text-3xl font-bold text-pink-200">
          {displayContent === "delete" ? "Are you sure?" : "Delete?"}
        </span>
        <span className="w-fit rounded-full bg-neutral-200/30 px-4 py-2">{content}</span>
        <div className="mt-16 flex">
          <IconButtons icon={LuX} onClick={closeModal} />
          <IconButtons
            icon={displayContent === "delete" ? LuCheck : LuTrash2}
            onClick={displayContent === "delete" ? deleteHandler : deleteDisplay}
          />
        </div>
      </div>
    </Modal>
  );
}

export default MessageModal;
