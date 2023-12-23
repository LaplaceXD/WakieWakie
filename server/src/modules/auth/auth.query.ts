import { inArray, eq, ne, and, notInArray } from "drizzle-orm";

import { Gender, Interest, QueryResolvers } from "@/__generated__/gql";
import { conversationMetadata, db, users } from "@/database";
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

    const interestThatMatchGender: Interest[] = [Interest.Everyone];
    if (session.user!.gender !== Gender.Others) {
      interestThatMatchGender.push(session.user!.gender === Gender.Male ? Interest.Male : Interest.Female);
    }

    let matchedInterests = db
      .select({ id: users.id })
      .from(users)
      .where(inArray(users.interest, interestThatMatchGender))
      .$dynamic();

    if (session.user!.interest !== Interest.Everyone) {
      matchedInterests = matchedInterests.where(
        eq(users.gender, session.user!.interest === Interest.Male ? Gender.Male : Gender.Female),
      );
    }

    return db
      .select()
      .from(users)
      .where(
        and(
          // should not match current user
          ne(users.id, session.user!.id),
          // should not match users that already matched
          notInArray(users.id, matches),
          // should only match users that are within the user's interest, and vice versa
          inArray(users.id, matchedInterests),
        ),
      );
  },
};

export default queries;
