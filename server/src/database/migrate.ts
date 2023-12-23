import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "path";
import postgres from "postgres";

import { db as dbConfig } from "@/config/db";

const client = postgres({ ...dbConfig, max: 1 });
migrate(drizzle(client), { migrationsFolder: path.join(__dirname, "migrations") }).then(() => client.end());
