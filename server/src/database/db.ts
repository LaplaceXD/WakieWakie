import * as schema from "@/database/models";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const connection = new Database("./src/database/db.sqlite");
export const db = drizzle(connection, { schema });
