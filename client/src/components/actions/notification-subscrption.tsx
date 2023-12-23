import { gql } from "@apollo/client";

export const GET_SUBSCRIPTION = gql(`
    subscription GetSubscription {
      notification {
        id
        message
        metadata
        createdAt
        seenedAt
      }
    }
`);
