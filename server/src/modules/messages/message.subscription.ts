import { MessageEvents, SubscriptionResolvers } from "@/__generated__/gql";
import { conversationMetadata, db } from "@/database";
import { ForbiddenError, UnauthenticatedError } from "@/errors";
import { and, eq, notInArray } from "drizzle-orm";
import { withFilter } from "graphql-subscriptions";

const subscriptions: SubscriptionResolvers = {
  conversationMessages: {
    subscribe: async (_, { conversationId }, { session, pubsub }) => {
      if (!session.user) throw new UnauthenticatedError();
      const [isInConversation] = await db
        .select()
        .from(conversationMetadata)
        .where(
          and(
            eq(conversationMetadata.conversationId, conversationId),
            eq(conversationMetadata.userId, session.user!.id),
          ),
        );
      if (!isInConversation) throw new ForbiddenError();

      return {
        [Symbol.asyncIterator]: withFilter(
          () =>
            pubsub.asyncIterator([
              MessageEvents.Sent,
              MessageEvents.Seened,
              MessageEvents.Unsent,
              MessageEvents.Updated,
            ]),
          payload => payload.conversationMessages.message.conversationId === conversationId,
        ),
      };
    },
  },
  userMessages: {
    subscribe: async (_, { excludeIds }, { session, pubsub }) => {
      if (!session.user) throw new UnauthenticatedError();
      const userConversations = await db
        .select({ conversationId: conversationMetadata.conversationId })
        .from(conversationMetadata)
        .where(
          and(
            eq(conversationMetadata.userId, session.user!.id),
            notInArray(conversationMetadata.conversationId, excludeIds ?? []),
          ),
        );

      return {
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator([MessageEvents.Sent, MessageEvents.Unsent]),
          payload =>
            Boolean(
              userConversations.find(
                ({ conversationId }) => payload.conversationMessages.message.conversationId === conversationId,
              ),
            ),
        ),
      };
    },
  },
};

export default subscriptions;
