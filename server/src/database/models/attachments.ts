import { randomUUID } from "crypto";
import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { relations } from "drizzle-orm";
import { messages } from "./messages";

export const attachments = sqliteTable("attachments", {
  id: text("attachment_id").notNull().primaryKey().$defaultFn(randomUUID),
  messageId: text("messageId")
    .notNull()
    .references(() => messages.id),
  blob: blob("blob", { mode: "buffer" }),
});

export const attachmentMessage = relations(attachments, ({ one }) => ({
  message: one(messages),
}));

export const messageAttachments = relations(messages, ({ many }) => ({
  attachments: many(attachments),
}));
