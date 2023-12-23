import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql(`
    mutation SendMessage($conversationId: ID!, $content: String!) {
      sendMessage(conversationId: $conversationId, content: $content) {
        code
        success
        message
        messages {
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
