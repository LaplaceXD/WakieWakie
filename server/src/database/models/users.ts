import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: int("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
    email: text("email").unique("unique_email").notNull(),
    username: text("username").notNull().unique("unique_username"),
    password: text("password").notNull(),
    status: text("status", { enum: ["active", "deactivated", "deleted", "blocked"] })
      .default("active")
      .notNull(),
    lastLogin: int("last_login", { mode: "timestamp" }),
  },
  users => ({
    usernameIdx: index("username_idx").on(users.username),
  }),
);
