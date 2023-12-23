import gql from "graphql-tag";

export const typeDefs = gql`
  "Different message events that could be published for subscription."
  enum MessageEvents {
    SENT
    SEENED
    UPDATED
    UNSENT
  }

  "The subsciption payload schema."
  type MessagePayload {
    event: MessageEvents!
    message: Message!
  }

  "The message schema."
  type Message {
    "The id of the message."
    id: ID!
    "The user that sent the message."
    sender: User!
    "The content of the message."
    content: String!
    "The time the message was sent."
    sentAt: DateTime!
    "The time the message was seened by the other user."
    seenedAt: DateTime
    "The time the message was updated."
    updatedAt: DateTime
  }

  "The message response schema."
  type MessageResponse implements Response {
    code: ResponseCode!
    success: Boolean!
    message: JSON!
    messages: [Message!]!
  }

  type Query {
    "Get the message history of a given conversation. The limit only applies to unsent messages, this includes all unseen messages."
    messages(
      "The conversation."
      conversationId: ID!
      "The number of conversations to retrieve."
      limit: Int!
      "The offset to be used."
      offset: Int!
    ): [Message!]!
  }

  type Mutation {
    "Send a message to a given conversation."
    sendMessage(conversationId: ID!, content: String!): MessageResponse!
    "Updates a given message."
    updateMessage(messageId: ID!, content: String!): MessageResponse!
    "Set a given message as seened."
    seenMessage(messageId: ID!): MessageResponse!
    "Delete a given message. This only deletes it for one user."
    deleteMessage(messageId: ID!): MessageResponse!
    "Delete all messages in a given conversation."
    deleteAllMessages(conversationId: ID!): MessageResponse!
    "Unsend a given message. This deletes it for both user."
    unsendMessage(messageId: ID!): MessageResponse!
  }

  type Subscription {
    "Subscribe to the messages of a given conversation."
    conversationMessages(conversationId: ID!): MessagePayload!
    "Subscribe to all messages sent to your account, you can put up an excluded list of conversation IDs."
    userMessages(excludeIds: [ID!]): MessagePayload!
  }
`;
