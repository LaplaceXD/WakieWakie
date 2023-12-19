CREATE TABLE `profile` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`gender` text NOT NULL,
	`interest` text NOT NULL,
	`is_gender_public` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`last_login` integer
);
--> statement-breakpoint
CREATE INDEX `gender_idx` ON `profile` (`gender`);--> statement-breakpoint
CREATE INDEX `interest_idx` ON `profile` (`interest`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_email` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_username` ON `users` (`username`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `users` (`username`);