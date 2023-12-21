import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { routines } from "./routines";
import { users } from "./users";

export const completedRoutines = pgTable(
  "completed_routines",
  {
    routineId: uuid("routine_id")
      .notNull()
      .references(() => routines.id),
    completerId: uuid("completer_id")
      .notNull()
      .references(() => users.id),
    completedAt: timestamp("completed_at").notNull().defaultNow(),
  },
  table => ({
    id: primaryKey({ columns: [table.routineId, table.completerId] }),
  }),
);

export const userCompletedRoutines = relations(users, ({ many }) => ({
  completedRoutines: many(completedRoutines),
}));

export const routinesCompleted = relations(routines, ({ many }) => ({
  completed: many(completedRoutines),
}));

export const completedRoutinesRelations = relations(users, ({ one }) => ({
  routine: one(routines),
  completer: one(users),
}));

export type CompletedRoutineModel = typeof completedRoutines.$inferSelect;
