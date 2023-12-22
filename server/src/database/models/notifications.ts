import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";

export const notifications = pgTable("notifications", {
  id: uuid("notification_id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  message: text("message").notNull(),
  metadata: text("metadata").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  seenedAt: timestamp("seened_at"),
});

export const userNotifications = relations(users, ({ many }) => ({
  notifications: many(notifications),
}));

export const notificationUser = relations(notifications, ({ one }) => ({
  user: one(notifications),
}));

export type NotificationModel = typeof notifications.$inferSelect;
