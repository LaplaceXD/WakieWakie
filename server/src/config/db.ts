import { Options } from "postgres";

export const db = {
  username: process.env["DB_USERNAME"] || "postgres",
  password: process.env["DB_PASSWORD"] || "",
  hostname: process.env["DB_HOSTNAME"] || "localhost",
  database: process.env["DB_DATABASE"],
  port: parseInt(process.env["DB_PORT"] || "5432"),
  ssl: process.env["NODE_ENV"] === "production" ? "require" : false,
} satisfies Options<NonNullable<unknown>>;
