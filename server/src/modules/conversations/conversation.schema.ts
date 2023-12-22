import gql from "graphql-tag";

export const typeDefs = gql`
  "The conversation schema."
  type Conversation {
    "The conversation ID."
    id: ID!
    "The date when the conversation was created."
    createdAt: DateTime!
    "The users within the conversation."
    users: [User!]!
    "The user that blocked the conversation."
    blocker: User
    "A check whether the currently logged in user has muted this conversation."
    isMuted: Boolean!
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
    "Set the conversation as muted or not."
    setConversationMute(conversationId: ID!, isMuted: Boolean!): ConversationResponse!
    "Set a given conversation as blocked or not."
    setConversationBlock(conversationId: ID!, isBlocked: Boolean!): ConversationResponse!
  }
`;
