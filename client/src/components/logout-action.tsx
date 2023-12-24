import { gql } from "@apollo/client";

export const LOGOUT_ACTION = gql(`
    mutation LogoutAccount {
      logoutAccount {
        code
        success
        message
      }
    }
`);
