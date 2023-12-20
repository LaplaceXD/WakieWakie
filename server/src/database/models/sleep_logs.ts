import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const sleepLogs = sqliteTable("sleep_logs", {
  id: text("log_id").primaryKey().notNull().$defaultFn(randomUUID),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  loggedAt: int("logged_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  isSnooze: int("is_snooze", { mode: "boolean" }).notNull().default(false),
});

export const userSleepLogs = relations(users, ({ many }) => ({
  sleepLogs: many(sleepLogs),
}));

export const sleepLogUser = relations(sleepLogs, ({ one }) => ({
  user: one(users),
}));
