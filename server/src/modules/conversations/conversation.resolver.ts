import { ConversationType, Resolvers } from "@/__generated__/gql";
import { conversationUsers, db, users } from "@/database";
import { and, eq, inArray } from "drizzle-orm";

import { UnauthenticatedError } from "@/errors";
import Mutation from "./conversation.mutation";
import Query from "./conversation.query";

export const resolvers: Resolvers = {
  Mutation,
  Query,
  Conversation: {
    users: ({ id }) => {
      const conversationUserIds = db
        .select({ userId: conversationUsers.userId })
        .from(conversationUsers)
        .where(eq(conversationUsers.conversationId, id));

      return db.select().from(users).where(inArray(users.id, conversationUserIds));
    },
    type: async ({ id }, _, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      const convoUsers = await db
        .select({ userId: conversationUsers.userId, acceptedAt: conversationUsers.acceptedAt })
        .from(conversationUsers)
        .where(eq(conversationUsers.conversationId, id));

      if (convoUsers.every(({ acceptedAt }) => acceptedAt !== null)) {
        return ConversationType.Match;
      } else if (convoUsers.find(({ userId }) => userId === session.user!.id)?.acceptedAt) {
        return ConversationType.Proposal;
      }

      return ConversationType.Request;
    },
    blocker: async ({ id }, __, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      const usersThatBlockedTheConversation = db
        .select({ userId: conversationUsers.userId })
        .from(conversationUsers)
        .where(and(eq(conversationUsers.conversationId, id), eq(conversationUsers.isBlocked, true)));

      const populatedUsers = await db.select().from(users).where(inArray(users.id, usersThatBlockedTheConversation));
      if (populatedUsers.length === 0) return null;

      const currentUserBlocked = populatedUsers.find(({ id }) => id === session.user!.id);
      if (currentUserBlocked) return currentUserBlocked;

      return populatedUsers[0] || null;
    },
    isMuted: async ({ id }, __, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      const [result] = await db
        .select({ isMuted: conversationUsers.isMuted })
        .from(conversationUsers)
        .where(and(eq(conversationUsers.conversationId, id), eq(conversationUsers.userId, session.user!.id)));

      return result?.isMuted ?? false;
    },
  },
};
