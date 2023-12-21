import { relations } from "drizzle-orm";
import { customType, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { messages } from "./messages";

const bytea = customType<{ data: string; notNull: false; default: false }>({
  dataType() {
    return "bytea";
  },
  toDriver(val) {
    let newVal = val;
    if (val.startsWith("0x")) {
      newVal = val.slice(2);
    }

    return Buffer.from(newVal, "hex");
  },
  fromDriver(val) {
    return (val as Buffer).toString("hex");
  },
});

export const attachments = pgTable("attachments", {
  id: uuid("attachment_id").notNull().primaryKey().defaultRandom(),
  messageId: uuid("messageId")
    .notNull()
    .references(() => messages.id),
  blob: bytea("blob", { mode: "buffer" }),
  ext: varchar("ext", { length: 3 }),
});

export const attachmentMessage = relations(attachments, ({ one }) => ({
  message: one(messages),
}));

export const messageAttachments = relations(messages, ({ many }) => ({
  attachments: many(attachments),
}));

export type Attachment = typeof attachments.$inferSelect;
