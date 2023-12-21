import { relations } from "drizzle-orm";
import { index, pgTable, text, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const routines = pgTable(
  "routines",
  {
    id: uuid("routine_id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    time: time("time", { withTimezone: true }).notNull(),
    name: varchar("name", { length: 128 }).notNull(),
    description: text("description").notNull().default(""),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
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

export type RoutineModel = typeof routines.$inferSelect;
