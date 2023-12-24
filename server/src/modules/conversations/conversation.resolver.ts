import { ConversationType, Resolvers } from "@/__generated__/gql";
import { conversationMetadata, db, messageMetadata, messages, users } from "@/database";
import { and, eq, inArray, isNull, ne, desc, sql } from "drizzle-orm";

import { UnauthenticatedError } from "@/errors";
import Mutation from "./conversation.mutation";
import Query from "./conversation.query";

export const resolvers: Resolvers = {
  Mutation,
  Query,
  Conversation: {
    users: ({ id }) => {
      const conversationMetadataIds = db
        .select({ userId: conversationMetadata.userId })
        .from(conversationMetadata)
        .where(eq(conversationMetadata.conversationId, id));

      return db.select().from(users).where(inArray(users.id, conversationMetadataIds));
    },
    creator: async ({ creatorId }, _, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      const [user] = await db.select().from(users).where(eq(users.id, creatorId));
      return user!;
    },
    unseened: async ({ id }, _, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      const receivedConvoMessages = db
        .select({ id: messages.id })
        .from(messages)
        .where(and(eq(messages.conversationId, id), ne(messages.senderId, session.user!.id)));

      const results = await db
        .select({ unseened: sql<number>`cast(count('*') as int)` })
        .from(messageMetadata)
        .where(and(inArray(messageMetadata.messageId, receivedConvoMessages), isNull(messageMetadata.seenedAt)));

      return results[0]?.unseened ?? 0;
    },
    recentMessage: async ({ id }) => {
      const [recentMessage] = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, id))
        .orderBy(desc(messages.sentAt));

      return recentMessage || null;
    },
    type: async ({ id }, _, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      const convoUsers = await db
        .select({ userId: conversationMetadata.userId, acceptedAt: conversationMetadata.acceptedAt })
        .from(conversationMetadata)
        .where(eq(conversationMetadata.conversationId, id));

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
        .select({ userId: conversationMetadata.userId })
        .from(conversationMetadata)
        .where(and(eq(conversationMetadata.conversationId, id), eq(conversationMetadata.isBlocked, true)));

      const populatedUsers = await db.select().from(users).where(inArray(users.id, usersThatBlockedTheConversation));
      if (populatedUsers.length === 0) return null;

      const currentUserBlocked = populatedUsers.find(({ id }) => id === session.user!.id);
      if (currentUserBlocked) return currentUserBlocked;

      return populatedUsers[0] || null;
    },
    isMuted: async ({ id }, __, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      const [result] = await db
        .select({ isMuted: conversationMetadata.isMuted })
        .from(conversationMetadata)
        .where(and(eq(conversationMetadata.conversationId, id), eq(conversationMetadata.userId, session.user!.id)));

      return result?.isMuted ?? false;
    },
  },
};
