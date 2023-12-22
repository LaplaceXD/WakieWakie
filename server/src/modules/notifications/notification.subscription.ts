import { withFilter } from "graphql-subscriptions";

import { Events, SubscriptionResolvers } from "@/__generated__/gql";
import { UnauthenticatedError } from "@/errors";

const subscriptions: SubscriptionResolvers = {
  newNotification: {
    subscribe: (_, __, { session, pubsub }) => {
      if (!session.user) throw new UnauthenticatedError();

      return {
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator([Events.NewNotifications]),
          payload => payload.newNotification.userId === session.user!.id,
        ),
      };
    },
  },
};

export default subscriptions;
