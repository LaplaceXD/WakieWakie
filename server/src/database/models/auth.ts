import { relations } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const auth = sqliteTable(
  "auth",
  {
    id: text("auth_id")
      .primaryKey()
      .notNull()
      .references(() => users.id),
    email: text("email").notNull().unique("unique_email"),
    username: text("username").notNull().unique("unique_username"),
    password: text("password").notNull(),
    status: text("status", { enum: ["active", "deactivated", "deleted", "blocked"] })
      .default("active")
      .notNull(),
    lastLogin: int("last_login", { mode: "timestamp" }),
  },
  auth => ({
    emailIdx: index("email_idx").on(auth.email),
    usernameIdx: index("username_idx").on(auth.username),
  }),
);

export const userAuth = relations(users, ({ one }) => ({
  auth: one(auth, {
    fields: [users.id],
    references: [auth.id],
  }),
}));

export const authUser = relations(auth, ({ one }) => ({
  user: one(users),
}));
