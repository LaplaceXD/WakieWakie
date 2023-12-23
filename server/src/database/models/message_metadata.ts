import { foreignKey, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { messages } from "./messages";
import { users } from "./users";

export const messageMetadata = pgTable(
  "message_metadata",
  {
    messageId: uuid("message_id").notNull(),
    userId: uuid("user_id").notNull(),
    seenedAt: timestamp("seened_at"),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    pk: primaryKey({ columns: [table.messageId, table.userId] }),
    fkMessage: foreignKey({
      name: "message_metadata_messages_fk",
      columns: [table.messageId],
      foreignColumns: [messages.id],
    }),
    fkUsers: foreignKey({
      name: "message_metadata_users_fk",
      columns: [table.userId],
      foreignColumns: [users.id],
    }),
  }),
);

export type MessageMetadataModel = typeof messageMetadata.$inferSelect;
