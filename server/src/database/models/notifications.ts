import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const notifications = sqliteTable("notifications", {
  id: text("notification_id").notNull().primaryKey().$defaultFn(randomUUID),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content", { mode: "json" }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  seened_at: int("seened_at", { mode: "timestamp" }),
});

export const userNotifications = relations(users, ({ many }) => ({
  notifications: many(notifications),
}));

export const notificationUser = relations(notifications, ({ one }) => ({
  user: one(notifications),
}));
