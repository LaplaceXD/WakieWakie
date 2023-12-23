import { Resolvers } from "@/__generated__/gql";
import { and, eq, ne } from "drizzle-orm";

import { db, messageMetadata, users } from "@/database";
import { InternalServerError, UnauthenticatedError } from "@/errors";

import Mutation from "./message.mutation";
import Query from "./message.query";
import Subscription from "./message.subscription";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
  Message: {
    sender: async ({ senderId }) => {
      try {
        const [sender] = await db.select().from(users).where(eq(users.id, senderId));
        if (!sender) throw new Error(`User ${senderId} does not exist.`);

        return sender;
      } catch (err) {
        throw new InternalServerError(err as Error);
      }
    },
    seenedAt: async ({ id }, _, { session }) => {
      if (!session.user) throw new UnauthenticatedError();

      try {
        const [metadata] = await db
          .select({ seenedAt: messageMetadata.seenedAt })
          .from(messageMetadata)
          .where(and(eq(messageMetadata.messageId, id), ne(messageMetadata.userId, session.user!.id)));
        if (!metadata) throw new Error(`Metadata is incomplete for message ${id}.`);

        return metadata.seenedAt;
      } catch (err) {
        throw new InternalServerError(err as Error);
      }
    },
  },
};
