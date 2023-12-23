import { gql } from "@apollo/client";

export const SEEN_NOTIFICATIONS = gql(`
    mutation SeenNotification($seenNotificationId: ID!) {
      seenNotification(id: $seenNotificationId) {
        code
        success
        message
        notification {
          id
          message
          metadata
          createdAt
          seenedAt
        }
      }
    }
`);
