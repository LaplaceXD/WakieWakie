import { sql } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const userProfiles = sqliteTable(
  "profile",
  {
    id: int("id", { mode: "number" })
      .primaryKey()
      .references(() => users.id)
      .notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("first_name").notNull(),
    gender: text("gender").notNull(),
    interest: text("interest", { enum: ["Male", "Female", "Both"] }).notNull(),
    isGenderPublic: int("is_gender_public", { mode: "boolean" }).notNull().default(false),
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: int("updated_at", { mode: "timestamp" }),
  },
  userProfile => ({
    gender_idx: index("gender_idx").on(userProfile.gender),
    interest_idx: index("interest_idx").on(userProfile.interest),
  }),
);
