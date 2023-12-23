import { LuBell } from "react-icons/lu";
import { GET_NOTIFICATIONS } from "@/components/actions/get-notifications";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_SUBSCRIPTION } from "@/components/actions/notification-subscrption";
import NotificationModal from "@/components/notification-modal";

function Notifications({ iconStyles }) {
  const [modalState, setModalState] = useState(false);

  const { data, subscribeToMore, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      limit: 10,
    },
  });

  useEffect(() => {
    const cleanUp = refetch()
      .then(() => {
        return subscribeToMore({
          document: GET_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { notification } = subscriptionData.data;
            return {
              recentNotifications: [notification, ...(prev.recentNotifications || [])],
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
  }, [refetch, subscribeToMore]);

  const notifications = data && data.recentNotifications ? data.recentNotifications : [];
  const filteredNotifications = notifications.filter(notification => {
    return notification.seenedAt === null;
  });

  const notificationCount = filteredNotifications?.length || 0;

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      <div className="relative" onClick={openModal}>
        {notificationCount > 0 && (
          <div className="absolute right-3 top-4 flex size-5 items-center justify-center rounded-full">
            <div className="duration-3000 absolute size-5 animate-ping rounded-full bg-yellow-100"></div>
            <span className="size-4 rounded-full bg-yellow-200 text-center text-xs text-neutral-200">
              {notificationCount}
            </span>
          </div>
        )}
        <LuBell className={`${iconStyles}`} />
      </div>
      {modalState && (
        <NotificationModal onClose={closeModal} notifications={filteredNotifications} count={notificationCount} />
      )}
    </>
  );
}

export default Notifications;
