import { and, eq, isNull, sql } from "drizzle-orm";

import { MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { conversationMetadata, conversations, db } from "@/database";
import { InternalServerError, UnauthenticatedError } from "@/errors";

import { publishNotification } from "../notifications";

const mutations: MutationResolvers = {
  createConversation: async (_, { userId }, { session, pubsub }) => {
    if (!session.user) throw new UnauthenticatedError();

    const conversee = await db.query.users.findFirst({
      where: ({ id }, { eq }) => eq(id, userId),
    });
    if (!conversee) {
      return {
        code: ResponseCode.NotFound,
        success: false,
        message: "Conversee does not exist.",
        conversation: null,
      };
    }

    try {
      const conversation = await db.transaction(async tx => {
        const [conversation] = await tx.insert(conversations).values({ creatorId: session.user!.id }).returning();
        if (!conversation) return tx.rollback();

        const users = await tx
          .insert(conversationMetadata)
          .values([
            {
              conversationId: conversation.id,
              userId: session.user!.id,
              acceptedAt: sql`now()`,
            },
            {
              conversationId: conversation.id,
              userId,
            },
          ])
          .returning();
        if (users.length < 2) return tx.rollback();

        try {
          await publishNotification(pubsub, userId, `${session.user!.firstName} sent you a message.`, {
            conversationId: conversation.id,
          });
        } catch {
          return tx.rollback();
        }

        return conversation;
      });

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message request successfully created.",
        conversation,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  acceptConversation: async (_, { conversationId }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const [conversation] = await db.select().from(conversations).where(eq(conversations.id, conversationId));
      if (!conversation) {
        return {
          code: ResponseCode.NotFound,
          success: false,
          message: "Message request does not exist.",
          conversation: null,
        };
      }

      if (conversation.creatorId === session.user!.id) {
        return {
          code: ResponseCode.BadRequest,
          success: false,
          message: "Proposal has already been sent.",
          conversation: null,
        };
      }

      const [request] = await db
        .update(conversationMetadata)
        .set({ acceptedAt: sql`now()` })
        .where(
          and(
            eq(conversationMetadata.conversationId, conversationId),
            eq(conversationMetadata.userId, session.user!.id),
            isNull(conversationMetadata.acceptedAt),
          ),
        )
        .returning();
      if (!request) {
        return {
          code: ResponseCode.BadRequest,
          success: false,
          message: "Message request has already been accepted.",
          conversation: null,
        };
      }

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Message request successfully accepted.",
        conversation,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  toggleConversationMute: async (_, { conversationId }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const updatedPreferences = await db
        .update(conversationMetadata)
        .set({ isMuted: sql<boolean>`CASE WHEN ${conversationMetadata.isMuted} THEN FALSE ELSE TRUE END` })
        .where(
          and(
            eq(conversationMetadata.conversationId, conversationId),
            eq(conversationMetadata.userId, session.user!.id),
          ),
        )
        .returning();
      if (updatedPreferences.length === 0) {
        return {
          code: ResponseCode.NotFound,
          success: false,
          message: "Conversation does not exist.",
          conversation: null,
        };
      }

      const conversation = await db.query.conversations.findFirst({
        where: ({ id }, { eq }) => eq(id, conversationId),
      });

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Conversation muted successfully.",
        conversation,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  toggleConversationBlock: async (_, { conversationId }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const updatedPreferences = await db
        .update(conversationMetadata)
        .set({ isBlocked: sql<boolean>`CASE WHEN ${conversationMetadata.isBlocked} THEN FALSE ELSE TRUE END` })
        .where(
          and(
            eq(conversationMetadata.conversationId, conversationId),
            eq(conversationMetadata.userId, session.user!.id),
          ),
        )
        .returning();
      if (updatedPreferences.length === 0) {
        return {
          code: ResponseCode.NotFound,
          success: false,
          message: "Conversation does not exist.",
          conversation: null,
        };
      }

      const conversation = await db.query.conversations.findFirst({
        where: ({ id }, { eq }) => eq(id, conversationId),
      });

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Conversation blocked successfully.",
        conversation,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
};

export default mutations;
