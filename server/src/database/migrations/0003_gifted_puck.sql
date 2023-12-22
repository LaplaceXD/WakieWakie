ALTER TABLE "auth" DROP CONSTRAINT "email_unique";--> statement-breakpoint
ALTER TABLE "auth" DROP CONSTRAINT "username_unique";--> statement-breakpoint
ALTER TABLE "auth" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "auth" ADD CONSTRAINT "unique_email" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "auth" ADD CONSTRAINT "unique_username" UNIQUE("username");