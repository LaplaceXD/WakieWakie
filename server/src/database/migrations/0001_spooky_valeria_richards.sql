CREATE TABLE IF NOT EXISTS "message_metadata" (
	"message_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"seened_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "message_metadata_message_id_user_id_pk" PRIMARY KEY("message_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message_metadata" ADD CONSTRAINT "message_metadata_messages_fk" FOREIGN KEY ("message_id") REFERENCES "messages"("message_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message_metadata" ADD CONSTRAINT "message_metadata_users_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
