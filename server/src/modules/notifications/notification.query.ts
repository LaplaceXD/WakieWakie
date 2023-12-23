import { desc, eq, isNotNull, isNull } from "drizzle-orm";
import { union } from "drizzle-orm/pg-core";

import { QueryResolvers } from "@/__generated__/gql";
import { db, notifications } from "@/database";
import { UnauthenticatedError } from "@/errors";

const queries: QueryResolvers = {
  recentNotifications: async (_, { limit }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    const userNotifs = db
      .$with("un")
      .as(db.select().from(notifications).where(eq(notifications.userId, session.user.id)));

    const recentSeenedNotifs = db
      .with(userNotifs)
      .select()
      .from(userNotifs)
      .where(isNull(userNotifs.seenedAt))
      .limit(limit <= 0 ? 0 : limit);
    const unseenedNotifs = db.with(userNotifs).select().from(userNotifs).where(isNotNull(userNotifs.seenedAt));

    const recentNotifs = await union(recentSeenedNotifs, unseenedNotifs).orderBy(desc(notifications.createdAt));
    return recentNotifs;
  },
};

export default queries;
