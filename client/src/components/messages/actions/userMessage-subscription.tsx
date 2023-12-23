import { gql } from "@apollo/client";

export const USER_MESSAGE_SUBSCRIPTION = gql(`
    subscription userMessageSubscription($excludeIds: [ID!]) {
      userMessages(excludeIds: $excludeIds) {
        event
        message {
          id
          sender {
            id
            firstName
            lastName
            bio
            gender
            interest
            city
            country
            alarmTime
            createdAt
            updatedAt
            account {
              id
              email
              username
              lastLogin
            }
          }
          content
          sentAt
          seenedAt
          updatedAt
          conversationId
        }
      }
    }
`);
