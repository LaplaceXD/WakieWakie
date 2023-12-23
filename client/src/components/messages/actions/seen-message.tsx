import { gql } from "@apollo/client";

export const SEEN_MESSAGE = gql(`
    mutation Mutation($messageId: ID!) {
      seenMessage(messageId: $messageId) {
        code
        success
        message
        messages {
          id
          conversationId
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
