import {gql} from "@apollo/client";

export const GET_USERS = gql(`
    query Users {
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
    account {
      id
      email
      username
      lastLogin
    }
  }
}
`)