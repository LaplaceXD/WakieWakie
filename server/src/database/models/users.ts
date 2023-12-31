import { Gender, Interest } from "@/__generated__/gql";
import { pgTable, text, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("user_id").notNull().primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull().default(""),
  bio: text("bio").notNull().default(""),
  gender: varchar("gender", { length: 6, enum: ["MALE", "FEMALE", "OTHER"] })
    .notNull()
    .$type<Gender>(),
  interest: varchar("interest", { length: 8, enum: ["MALE", "FEMALE", "EVERYONE"] })
    .notNull()
    .$type<Interest>(),
  city: varchar("city", { length: 256 }).notNull().default(""),
  country: varchar("country", { length: 256 }).notNull(),
  alarmTime: time("alarm_time", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type UserModel = typeof users.$inferSelect;
