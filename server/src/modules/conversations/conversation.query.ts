import { desc, eq, inArray, sql } from "drizzle-orm";

import { QueryResolvers } from "@/__generated__/gql";
import { conversationMetadata, conversations, db, messages } from "@/database";
import { UnauthenticatedError } from "@/errors";

const queries: QueryResolvers = {
  conversations: async (_, { limit, offset }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    let adjustedLimit = limit;
    let adjustedOffset = offset;
    if (adjustedOffset < 0) {
      adjustedLimit = limit + offset;
      adjustedOffset = 0;
    }
    if (adjustedLimit <= 0) return [];

    const loggedInUserConversations = db
      .select({ conversationId: conversationMetadata.conversationId })
      .from(conversationMetadata)
      .where(eq(conversationMetadata.userId, session.user!.id));

    const convoRecents = db
      .select({
        conversationId: messages.conversationId,
        mostRecentActivity: sql<Date | null>`MAX(${messages.sentAt})`.as("most_recent_activity"),
      })
      .from(messages)
      .groupBy(messages.conversationId)
      .as("convo_recent_activity");

    const results = await db
      .select({
        id: conversations.id,
        createdAt: conversations.createdAt,
        creatorId: conversations.creatorId,
        mostRecentActivity: convoRecents.mostRecentActivity,
      })
      .from(conversations)
      .leftJoin(convoRecents, eq(conversations.id, convoRecents.conversationId))
      .where(inArray(conversations.id, loggedInUserConversations))
      .orderBy(desc(convoRecents.mostRecentActivity), desc(conversations.id))
      .offset(adjustedOffset)
      .limit(adjustedLimit);

    return results;
  },
};

export default queries;
