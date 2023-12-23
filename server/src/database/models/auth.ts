import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

export const auth = pgTable("auth", {
  id: uuid("auth_id")
    .primaryKey()
    .notNull()
    .references(() => users.id),
  email: varchar("email", { length: 256 }).notNull().unique("unique_email"),
  username: varchar("username", { length: 256 }).notNull().unique("unique_username"),
  password: varchar("password").notNull(),
  deletedAt: timestamp("deleted_at"),
  lastLogin: timestamp("last_login"),
});

export type AuthModel = typeof auth.$inferSelect;
