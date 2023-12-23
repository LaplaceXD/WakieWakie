import {gql} from "@apollo/client";

export const LOGIN_USER = gql(`
    mutation LoginAccount($username: String!, $password: String!) {
      loginAccount(username: $username, password: $password) {
        message
        code
        success
        user {
          account {
            username
          }
        }
      }
    }
`);