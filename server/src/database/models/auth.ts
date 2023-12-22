import { relations } from "drizzle-orm";
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

export const userAuth = relations(users, ({ one }) => ({
  auth: one(auth, {
    fields: [users.id],
    references: [auth.id],
  }),
}));

export const authUser = relations(auth, ({ one }) => ({
  user: one(users),
}));

export type AuthModel = typeof auth.$inferSelect;
