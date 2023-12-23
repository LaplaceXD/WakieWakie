ALTER TABLE "messages" DROP COLUMN IF EXISTS "received_at";--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN IF EXISTS "seened_at";--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN IF EXISTS "deleted_at";