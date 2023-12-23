import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Timetz
  scalar JSON
  scalar DateTime

  "There are the possible events in the system."
  enum Events {
    NOTIFICATION
  }

  "These are the possible response codes returned from a response."
  enum ResponseCode {
    OK
    BAD_USER_INPUT
    BAD_REQUEST
    NOT_FOUND
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

  type Query {
    ping: String!
  }
`;
