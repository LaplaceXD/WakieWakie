import { relations } from "drizzle-orm";
import { boolean, foreignKey, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { conversations } from "./conversations";
import { users } from "./users";

export const conversationUsers = pgTable(
  "conversation_users",
  {
    conversationId: uuid("conversation_id").notNull(),
    userId: uuid("user_id").notNull(),
    invitedAt: timestamp("invited_at").notNull().defaultNow(),
    acceptedAt: timestamp("accepted_at"),
    isMuted: boolean("is_muted").notNull().default(false),
    isBlocked: boolean("is_blocked").notNull().default(false),
  },
  table => ({
    pk: primaryKey({ columns: [table.conversationId, table.userId] }),
    fkConversation: foreignKey({
      name: "conversation_users_conversation_fk",
      columns: [table.conversationId],
      foreignColumns: [conversations.id],
    }),
    fkUsers: foreignKey({
      name: "conversation_users_users_fk",
      columns: [table.userId],
      foreignColumns: [users.id],
    }),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  conversations: many(conversationUsers),
}));

export const conversationsRelations = relations(conversations, ({ many }) => ({
  conversationUsers: many(conversationUsers),
}));

export const conversationUsersRelations = relations(conversationUsers, ({ one }) => ({
  users: one(users),
  conversations: one(conversations),
}));

export type ConversationUserModel = typeof conversationUsers.$inferSelect;
