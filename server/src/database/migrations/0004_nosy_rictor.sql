ALTER TABLE "notifications" RENAME COLUMN "content" TO "message";--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "message" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "metadata" json NOT NULL;