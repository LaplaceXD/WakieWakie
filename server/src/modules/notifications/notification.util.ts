import { Events } from "@/__generated__/gql";
import { db, notifications } from "@/database";
import type { PubSub } from "graphql-subscriptions";

export async function publishNotification(
  pubsub: PubSub,
  to: string,
  message: string,
  metadata: Record<string, unknown> = {},
) {
  const [notification] = await db
    .insert(notifications)
    .values({
      message,
      userId: to,
      metadata: JSON.stringify(metadata),
    })
    .returning();
  if (!notification) throw new Error("An error occured when inserting notification.");

  await pubsub.publish(Events.NewNotifications, { newNotification: notification });
}
