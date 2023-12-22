import { and, eq, sql } from "drizzle-orm";

import { MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { db, notifications } from "@/database";
import { UnauthenticatedError } from "@/errors";

export const mutations: MutationResolvers = {
  seenNotification: async (_, { id }, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    const [notification] = await db
      .update(notifications)
      .set({ seenedAt: sql`now()` })
      .where(and(eq(notifications.id, id), eq(notifications.userId, session.user!.id)))
      .returning();
    if (!notification) {
      return {
        code: ResponseCode.NotFound,
        success: false,
        message: "Notification does not exist.",
        notification: null,
      };
    }

    return {
      code: ResponseCode.Ok,
      success: true,
      message: "Notification seened successfully.",
      notification,
    };
  },
};

export default mutations;
