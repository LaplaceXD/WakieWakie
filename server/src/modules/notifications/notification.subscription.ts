import { withFilter } from "graphql-subscriptions";

import { Events, SubscriptionResolvers } from "@/__generated__/gql";
import { UnauthenticatedError } from "@/errors";

const subscriptions: SubscriptionResolvers = {
  notification: {
    subscribe: (_, __, { session, pubsub }) => {
      if (!session.user) throw new UnauthenticatedError();

      return {
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator([Events.Notification]),
          payload => payload.notification.userId === session.user!.id,
        ),
      };
    },
  },
};

export default subscriptions;
