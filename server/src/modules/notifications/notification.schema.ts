import gql from "graphql-tag";

export const typeDefs = gql`
  "The notification schema."
  type Notification {
    "The id of the notification."
    id: ID!
    "The notification message."
    message: String!
    "Extra metadata contained in the notification."
    metadata: JSON!
    "When the notification was created."
    createdAt: DateTime!
    "When the notification was seened."
    seenedAt: DateTime
  }

  "The notification response schema."
  type NotificationResponse implements Response {
    code: ResponseCode!
    success: Boolean!
    message: JSON!
    notification: Notification
  }

  type Query {
    """
    Query for all recent notifications based on a given limit,
    this also returns all unseened notifications and is not part
    of the limit count.
    """
    recentNotifications(limit: Int!): [Notification!]!
  }

  type Mutation {
    "Set a given notification as seened based on its id."
    seenNotification(id: ID!): NotificationResponse!
  }

  type Subscription {
    "Subscribe to new notifications."
    notification: Notification!
  }
`;
