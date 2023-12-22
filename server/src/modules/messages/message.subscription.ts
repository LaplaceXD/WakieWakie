import { SubscriptionResolvers } from "@/__generated__/gql";

export const subscriptions: SubscriptionResolvers = {
  messages: {
    subscribe: (_, __, { pubsub }) => ({
      [Symbol.asyncIterator]: () => pubsub.asyncIterator(["MESSAGE_SENT"]),
    }),
  },
};
