import {gql} from "@apollo/client";

export const CREATE_CONVERSATION = gql(`
    mutation Mutation($userId: ID!) {
      createConversation(userId: $userId) {
        code
        success
        message
        conversation {
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
}
`);