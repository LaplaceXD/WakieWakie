import gql from "graphql-tag";

export const typeDefs = gql`
  "The conversation schema."
  type Conversation {
    "The conversation ID."
    id: ID!
    "The date when the conversation was created."
    createdAt: DateTime!
    "The users within the conversation."
    users: [ConversationUser!]!
  }

  "The conversation user preferences schema."
  type ConversationUser {
    "The conversation the user is a part of."
    conversationId: ID!
    "The user part of the conversation."
    userId: ID!
    "The date the user was invited to the conversation."
    invitedAt: DateTime!
    "The date the user accepted the conversation."
    acceptedAt: DateTime
    "Toggleable option wherein the user mutes a conversation."
    isMuted: Boolean!
    "Toggleable option wherein the user blocks a conversation."
    isBlocked: Boolean!
  }

  "The conversation response schema."
  type ConversationResponse implements Response {
    code: ResponseCode!
    success: Boolean!
    message: JSON!
    conversation: Conversation
  }

  type Query {
    "Current conversations of the currently logged in user."
    conversations: [Conversation!]!
    "Message requests of the currently logged in user."
    messageRequests: [Conversation!]!
  }

  type Mutation {
    "Create a conversation with a given user."
    createConversation(userId: ID!): ConversationResponse!
    "Mute a conversation with a given user."
    muteConversation(conversationId: ID!): ConversationResponse!
    "Block a conversation with a given user."
    blockConversation(conversationId: ID!): ConversationResponse!
  }
`;
