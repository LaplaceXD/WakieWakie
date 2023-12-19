CREATE TABLE `attachments` (
	`attachment_id` text PRIMARY KEY NOT NULL,
	`messageId` text NOT NULL,
	`blob` blob,
	FOREIGN KEY (`messageId`) REFERENCES `messages`(`message_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `auth` (
	`auth_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`last_login` integer,
	FOREIGN KEY (`auth_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `completed_routines` (
	`routine_id` text NOT NULL,
	`completer_id` text NOT NULL,
	`completed_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`completer_id`, `routine_id`),
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`routine_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`completer_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`conversation_id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `conversation_users` (
	`conversation_id` text NOT NULL,
	`user_id` text NOT NULL,
	`invited_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`accepted_at` integer,
	`is_muted` integer DEFAULT false NOT NULL,
	`is_blocked` integer DEFAULT false NOT NULL,
	PRIMARY KEY(`conversation_id`, `user_id`),
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`conversation_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`notification_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`seened_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `routines` (
	`routine_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`time` text NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text DEFAULT '' NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`gender` text NOT NULL,
	`interest` text NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`country` text NOT NULL,
	`alarm_time` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`message_id` text PRIMARY KEY NOT NULL,
	`conversation_id` text NOT NULL,
	`sender_id` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`sent_at` integer DEFAULT CURRENT_TIMESTAMP,
	`received_at` integer,
	`seened_at` integer,
	`deleted_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`conversation_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sender_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_email` ON `auth` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_username` ON `auth` (`username`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `auth` (`email`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `auth` (`username`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `routines` (`name`);--> statement-breakpoint
CREATE INDEX `gender_idx` ON `users` (`gender`);--> statement-breakpoint
CREATE INDEX `interest_idx` ON `users` (`interest`);--> statement-breakpoint
CREATE INDEX `alarm_time_idx` ON `users` (`alarm_time`);--> statement-breakpoint
CREATE INDEX `location_idx` ON `users` (`city`,`country`);