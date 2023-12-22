ALTER TABLE "conversations" DROP CONSTRAINT "conversations_creator_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "conversations" DROP COLUMN IF EXISTS "creator_id";