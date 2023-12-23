import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";

export const sleepLogs = pgTable("sleep_logs", {
  id: uuid("log_id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  loggedAt: timestamp("logged_at").notNull().defaultNow(),
  isSnooze: boolean("is_snooze").notNull().default(false),
});

export type SleepLogModel = typeof sleepLogs.$inferSelect;
