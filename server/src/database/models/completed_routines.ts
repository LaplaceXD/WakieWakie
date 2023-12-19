import { relations, sql } from "drizzle-orm";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { routines } from "./routines";
import { users } from "./users";

export const completedRoutines = sqliteTable(
  "completed_routines",
  {
    routineId: text("routine_id")
      .notNull()
      .references(() => routines.id),
    completerId: text("completer_id")
      .notNull()
      .references(() => users.id),
    completedAt: int("completed_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  completedRoutine => ({
    id: primaryKey({ columns: [completedRoutine.routineId, completedRoutine.completerId] }),
  }),
);

export const userCompletedRoutines = relations(users, ({ many }) => ({
  completedRoutines: many(completedRoutines),
}));

export const routinesCompleted = relations(routines, ({ many }) => ({
  completed: many(completedRoutines),
}));

export const completedRoutinesRoutine = relations(users, ({ one }) => ({
  routine: one(routines),
}));

export const completedRoutinesCompleter = relations(completedRoutines, ({ one }) => ({
  completer: one(users),
}));
