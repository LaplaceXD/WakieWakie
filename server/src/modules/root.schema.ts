import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Timez

  "These are the possible response codes returned from a response."
  enum ResponseCode {
    OK
    BAD_INPUT
    UNAUTHORIZED
    FORBIDDEN
    INTERNAL_SERVER_ERROR
    BAD_USER_INPUT
  }

  "Base interface for responses."
  interface Response {
    "Response code."
    code: ResponseCode!
    "Boolean value which tells whether a certain operation was a success."
    success: Boolean!
    "Response message."
    message: String!
  }
`;
