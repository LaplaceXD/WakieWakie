import { sql } from "drizzle-orm";

import { MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { conversationUsers, conversations, db } from "@/database";
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
        const [conversation] = await tx.insert(conversations).values({}).returning();
        if (!conversation) return tx.rollback();

        const users = await tx
          .insert(conversationUsers)
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
};

export default mutations;
