import { gql } from "@apollo/client";

export const GET_CONVERSATIONS = gql(`
    query Conversation($limit: Int!, $offset: Int!) {
      conversations(limit: $limit, offset: $offset) {
        id
        creator {
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
        createdAt
        unseened
        recentMessage {
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
          }
          content
          sentAt
          seenedAt
          updatedAt
        }
        users {
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
        }
        type
        blocker {
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
        }
        isMuted
      }
    }
`);
