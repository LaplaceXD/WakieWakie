import { Gender, Interest } from "@/__generated__/gql";
import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: text("user_id").primaryKey().notNull().$defaultFn(randomUUID),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull().default(""),
    bio: text("bio").notNull().default(""),
    gender: text("gender", { enum: ["MALE", "FEMALE", "OTHER"] })
      .notNull()
      .$type<Gender>(),
    interest: text("interest", { enum: ["MALE", "FEMALE", "EVERYONE"] })
      .notNull()
      .$type<Interest>(),
    city: text("city").notNull().default(""),
    country: text("country").notNull(),
    alarmTime: text("alarm_time").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: int("updated_at", { mode: "timestamp" }),
  },
  user => ({
    genderIdx: index("gender_idx").on(user.gender),
    interestIdx: index("interest_idx").on(user.interest),
    alarmTimeIdx: index("alarm_time_idx").on(user.alarmTime),
    locationIdx: index("location_idx").on(user.city, user.country),
  }),
);
