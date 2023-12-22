import gql from "graphql-tag";

export const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
  }

  type MessageResponse implements Response {
    code: ResponseCode!
    success: Boolean!
    message: JSON!
    msg: Message
  }

  type Mutation {
    sendMessage(content: String!): MessageResponse!
  }

  type Subscription {
    messages: Message!
  }
`;
