import { Events } from "@/__generated__/gql";
import { db, notifications } from "@/database";
import type { PubSub } from "graphql-subscriptions";

/**
 * Publishes a notification to a given user.
 *
 * @param pubsub    The publication-subscription provider.
 * @param to        The `ID` of the user that the notification is sent to.
 * @param message   The notification message.
 * @param metadata  Extra metadata.
 */
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

  return pubsub.publish(Events.NewNotifications, { newNotification: notification });
}
