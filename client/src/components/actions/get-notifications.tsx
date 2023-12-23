import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql(`
    query GetNotification($limit: Int!) {
      recentNotifications(limit: $limit) {
        id
        message
        metadata
        createdAt
        seenedAt
      }
    }
`);
