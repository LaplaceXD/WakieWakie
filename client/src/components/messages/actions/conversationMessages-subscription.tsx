import { gql } from "@apollo/client";

export const CONVERSATION_MESSAGES_SUBSCRIPTION = gql(`
    subscription Subscription($conversationId: ID!) {
      conversationMessages(conversationId: $conversationId) {
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
        }
      }
    }
`);
