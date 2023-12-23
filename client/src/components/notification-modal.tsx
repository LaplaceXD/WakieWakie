import { LuMail } from "react-icons/lu";

import Modal from "@/components/common/modal";
import CheckNotification from "@/components/check-notification";
import { Notification } from "@/__generated__/graphql";

interface NotificationModalProps {
  onClose: () => void;
  notifications: Notification[];
  count: number;
}

function NotificationModal({ onClose, notifications, count }: NotificationModalProps) {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal onClickOutside={onClose}>
      {count > 0 ? (
        <>
          <span className="mb-5 text-4xl font-bold text-pink-200">Notifications</span>
          <div className="flex flex-col">
            {notifications.map((notification, index) => (
              <div key={index} className="mx-4 flex items-center justify-between">
                <div className="my-2 mr-4 flex w-full items-center rounded-lg bg-neutral-200/20 px-6 py-4">
                  <LuMail className="mr-4 size-6 text-pink-200" />
                  <span>{notification.message}</span>
                </div>
                <CheckNotification
                  convoID={notification.metadata.conversationId}
                  notifID={notification.id}
                  onClick={handleCloseModal}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mx-5 flex items-center">
          <LuMail className="mr-4 size-10 text-pink-200" />
          <span className="text-4xl font-bold text-pink-200">No new notifications</span>
        </div>
      )}
    </Modal>
  );
}

export default NotificationModal;
