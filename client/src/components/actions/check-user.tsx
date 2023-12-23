import { gql } from "@apollo/client";

export const CHECK_USER = gql(`
    query CheckUser {
      me {
        id
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
        }
      }
}
`);
