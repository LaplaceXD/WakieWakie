import { SubscriptionResolvers } from "@/__generated__/gql";

const subscriptions: SubscriptionResolvers = {
  messages: {
    subscribe: (_, __, { pubsub }) => ({
      [Symbol.asyncIterator]: () => pubsub.asyncIterator(["MESSAGE_SENT"]),
    }),
  },
};

export default subscriptions;
