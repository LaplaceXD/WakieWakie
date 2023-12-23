import { boolean, foreignKey, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { conversations } from "./conversations";
import { users } from "./users";

export const conversationMetadata = pgTable(
  "conversation_metadata",
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
      name: "conversation_metadata_conversation_fk",
      columns: [table.conversationId],
      foreignColumns: [conversations.id],
    }),
    fkUsers: foreignKey({
      name: "conversation_metadata_users_fk",
      columns: [table.userId],
      foreignColumns: [users.id],
    }),
  }),
);

export type ConversationMetadataModel = typeof conversationMetadata.$inferSelect;
