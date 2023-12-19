import { relations, sql } from "drizzle-orm";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { conversations } from "./conversations";
import { users } from "./users";

export const conversationUsers = sqliteTable(
  "conversation_users",
  {
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    invitedAt: int("invited_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    acceptedAt: int("accepted_at", { mode: "timestamp" }),
    isMuted: int("is_muted", { mode: "boolean" }).notNull().default(false),
    isBlocked: int("is_blocked", { mode: "boolean" }).notNull().default(false),
  },
  conversationUsers => ({
    id: primaryKey({ columns: [conversationUsers.conversationId, conversationUsers.userId] }),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  usersToConversations: many(conversationUsers),
}));

export const conversationsRelations = relations(conversations, ({ many }) => ({
  usersToConversations: many(conversationUsers),
}));

export const conversationUsersRelations = relations(conversationUsers, ({ one }) => ({
  users: one(users),
  conversations: one(conversations),
}));
