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
    pk: primaryKey({ columns: [table.routineId, table.completerId] }),
  }),
);

export type CompletedRoutineModel = typeof completedRoutines.$inferSelect;
