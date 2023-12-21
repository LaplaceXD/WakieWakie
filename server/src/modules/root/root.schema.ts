import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Timetz
  scalar JSON
  scalar Date

  "These are the possible response codes returned from a response."
  enum ResponseCode {
    OK
    BAD_USER_INPUT
    UNAUTHENTICATED
    FORBIDDEN
  }

  "Base interface for responses."
  interface Response {
    "Response code."
    code: ResponseCode!
    "Boolean value which tells whether a certain operation was a success."
    success: Boolean!
    "Response message."
    message: JSON!
  }
`;
