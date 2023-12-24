import { inArray, eq, ne, and, notInArray } from "drizzle-orm";

import { QueryResolvers } from "@/__generated__/gql";
import { conversationMetadata, conversations, db, users } from "@/database";
import { UnauthenticatedError } from "@/errors";

const queries: QueryResolvers = {
  me: (_, __, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    return session.user;
  },
  users: (_, __, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    const userConvos = db
      .select({ conversationId: conversationMetadata.conversationId })
      .from(conversationMetadata)
      .where(eq(conversationMetadata.userId, session.user!.id));
    const matches = db
      .select({ userId: conversationMetadata.userId })
      .from(conversationMetadata)
      .where(
        and(
          inArray(conversationMetadata.conversationId, userConvos),
          ne(conversationMetadata.userId, session.user!.id),
        ),
      );

    return db
      .select()
      .from(users)
      .where(and(ne(users.id, session.user!.id), notInArray(users.id, matches)));
  },
};

export default queries;
