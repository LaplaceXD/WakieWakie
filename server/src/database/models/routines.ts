import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const routines = sqliteTable(
  "routines",
  {
    id: text("routine_id").primaryKey().notNull().$defaultFn(randomUUID),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    time: text("time").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: int("updated_at", { mode: "timestamp" }),
  },
  routine => ({
    nameIdx: index("name_idx").on(routine.name),
  }),
);

export const userRoutines = relations(users, ({ many }) => ({
  routines: many(routines),
}));

export const routineUser = relations(routines, ({ one }) => ({
  user: one(users),
}));
