import { gql } from "@apollo/client";

export const GET_MESSAGES = gql(`
    query Messages($conversationId: ID!, $limit: Int!, $offset: Int!) {
      messages(conversationId: $conversationId, limit: $limit, offset: $offset) {
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
`);
