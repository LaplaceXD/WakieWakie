import { gql } from "@apollo/client";

export const REGISTER_USER = gql(`
  mutation Mutation($userDetails: RegisterInput!) {
  registerAccount(userDetails: $userDetails) {
    user {
      firstName
      lastName
      bio
      gender
      interest
      city
      country
      alarmTime
      account {
        email
        username
        lastLogin
      }
    }
    success
    message
    code
  }
}
`);
