import { and, desc, eq, inArray, isNull } from "drizzle-orm";

import { QueryResolvers } from "@/__generated__/gql";
import { conversationMetadata, db, messageMetadata, messages } from "@/database";
import { ForbiddenError, UnauthenticatedError } from "@/errors";

const queries: QueryResolvers = {
  messages: async (_, { conversationId, limit, offset }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();
    const [isInConversation] = await db
      .select()
      .from(conversationMetadata)
      .where(
        and(eq(conversationMetadata.conversationId, conversationId), eq(conversationMetadata.userId, session.user!.id)),
      );
    if (!isInConversation) throw new ForbiddenError();

    let adjustedLimit = limit;
    let adjustedOffset = offset;
    if (adjustedOffset < 0) {
      adjustedLimit = limit + offset;
      adjustedOffset = 0;
    }
    if (adjustedLimit <= 0) return [];

    const nonDeletedMessages = db
      .select({ messageId: messageMetadata.messageId })
      .from(messageMetadata)
      .where(isNull(messageMetadata.deletedAt));

    return db
      .select()
      .from(messages)
      .where(and(eq(messages.conversationId, conversationId), inArray(messages.id, nonDeletedMessages)))
      .orderBy(desc(messages.sentAt))
      .offset(adjustedOffset)
      .limit(adjustedLimit);
  },
};

export default queries;
