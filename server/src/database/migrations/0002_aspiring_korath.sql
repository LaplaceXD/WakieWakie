ALTER TABLE "auth" DROP CONSTRAINT "unique_email";--> statement-breakpoint
ALTER TABLE "auth" DROP CONSTRAINT "unique_username";--> statement-breakpoint
ALTER TABLE "auth" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "auth" ADD CONSTRAINT "email_unique" UNIQUE("email","deleted_at");--> statement-breakpoint
ALTER TABLE "auth" ADD CONSTRAINT "username_unique" UNIQUE("email","deleted_at");