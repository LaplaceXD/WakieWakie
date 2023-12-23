import gql from "graphql-tag";

export const typeDefs = gql`
  "The conversation type."
  enum ConversationType {
    "Proposals are conversations that are pending and are sent by the current logged in user."
    PROPOSAL
    "Requests are conversations that are pending and are sent by other users."
    REQUEST
    "Matches are conversations that have been accepted by both users."
    MATCH
  }

  "The conversation schema."
  type Conversation {
    "The conversation ID."
    id: ID!
    "The user that created the conversation."
    creator: User!
    "The date when the conversation was created."
    createdAt: DateTime!
    "The number of messages that have not been seen."
    unseened: Int!
    "The users within the conversation."
    users: [User!]!
    "The type of conversation."
    type: ConversationType!
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
    conversations(
      "The number of conversations to retrieve."
      limit: Int!
      "The offset to be used."
      offset: Int!
    ): [Conversation!]!
  }

  type Mutation {
    "Create a conversation with a given user."
    createConversation(userId: ID!): ConversationResponse!
    "Accept a conversation request."
    acceptConversation(conversationId: ID!): ConversationResponse!
    "Set the conversation as muted or not."
    toggleConversationMute(conversationId: ID!): ConversationResponse!
    "Set a given conversation as blocked or not."
    toggleConversationBlock(conversationId: ID!): ConversationResponse!
  }
`;
