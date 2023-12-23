import { MessageEvents, MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { conversationMetadata, db, messageMetadata, messages } from "@/database";
import { ForbiddenError, InternalServerError, UnauthenticatedError } from "@/errors";
import { and, eq, inArray, sql } from "drizzle-orm";

const mutations: MutationResolvers = {
  sendMessage: async (_, { content, conversationId }, { session, pubsub }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
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

      const message = await db.transaction(async tx => {
        const [message] = await tx
          .insert(messages)
          .values({
            conversationId,
            senderId: session.user!.id,
            content,
          })
          .returning();
        if (!message) return tx.rollback();

        const usersInConversations = await tx
          .select({
            messageId: sql<string>`${message.id}`,
            userId: conversationMetadata.userId,
            seenedAt: sql<Date | null>`CASE WHEN ${conversationMetadata.userId} = ${
              session.user!.id
            } THEN now() ELSE NULL END`,
          })
          .from(conversationMetadata)
          .where(eq(conversationMetadata.conversationId, conversationId));
        if (usersInConversations.length < 2) return tx.rollback();

        const metadata = await tx.insert(messageMetadata).values(usersInConversations).returning();
        if (metadata.length < 2) return tx.rollback();

        return message;
      });
      if (!message) throw new Error(`An error occured while sending the message.`);

      const payload = { event: MessageEvents.Sent, message };

      await pubsub.publish(MessageEvents.Sent, {
        conversationMessages: payload,
        userMessages: payload,
      });

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message was sent successfully.",
        messages: [message],
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  updateMessage: async (_, { content, messageId }, { session, pubsub }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const [message] = await db
        .update(messages)
        .set({ content })
        .where(and(eq(messages.id, messageId), eq(messages.senderId, session.user!.id)))
        .returning();
      if (!message) {
        return { code: ResponseCode.NotFound, success: false, message: "Message not found.", messages: [] };
      }

      const payload = { event: MessageEvents.Updated, message };

      await pubsub.publish(MessageEvents.Updated, {
        conversationMessages: payload,
        userMessages: payload,
      });

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message was updated successfully.",
        messages: [message],
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  seenMessage: async (_, { messageId }, { session, pubsub }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const [message] = await db.select().from(messages).where(eq(messages.id, messageId));
      if (!message) {
        return { code: ResponseCode.NotFound, success: false, message: "Message not found.", messages: [] };
      }

      const [metadata] = await db
        .update(messageMetadata)
        .set({ seenedAt: sql`now()` })
        .where(and(eq(messageMetadata.messageId, messageId), eq(messageMetadata.userId, session.user!.id)))
        .returning();
      if (!metadata) throw new ForbiddenError();

      const payload = { event: MessageEvents.Seened, message };

      await pubsub.publish(MessageEvents.Seened, {
        conversationMessages: payload,
        userMessages: payload,
      });

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message was seened successfully.",
        messages: [message],
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  deleteMessage: async (_, { messageId }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const [message] = await db.select().from(messages).where(eq(messages.id, messageId));
      if (!message) {
        return { code: ResponseCode.NotFound, success: false, message: "Message not found.", messages: [] };
      }

      const [metadata] = await db
        .update(messageMetadata)
        .set({ deletedAt: sql`now()` })
        .where(and(eq(messageMetadata.messageId, messageId), eq(messageMetadata.userId, session.user!.id)))
        .returning();
      if (!metadata) throw new ForbiddenError();

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message was deleted successfully.",
        messages: [message],
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  deleteAllMessages: async (_, { conversationId }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
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

      const convoMessageIds = db
        .select({ id: messages.id })
        .from(messages)
        .where(eq(messages.conversationId, conversationId));

      await db
        .update(messageMetadata)
        .set({ deletedAt: sql`now()` })
        .where(and(inArray(messageMetadata.messageId, convoMessageIds), eq(messageMetadata.userId, session.user!.id)));

      const convoMessages = await db.select().from(messages).where(eq(messages.conversationId, conversationId));

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message was deleted successfully.",
        messages: convoMessages,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  unsendMessage: async (_, { messageId }, { session, pubsub }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const [message] = await db.select().from(messages).where(eq(messages.id, messageId));
      if (!message) {
        return { code: ResponseCode.NotFound, success: false, message: "Message not found.", messages: [] };
      } else if (message.senderId !== session.user!.id) {
        throw new ForbiddenError();
      }

      await db
        .update(messageMetadata)
        .set({ deletedAt: sql`now()` })
        .where(eq(messageMetadata.messageId, messageId));

      const payload = { event: MessageEvents.Seened, message };

      await pubsub.publish(MessageEvents.Unsent, {
        conversationMessages: payload,
        userMessages: payload,
      });

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message was seened successfully.",
        messages: [message],
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
};

export default mutations;
