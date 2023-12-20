import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";

import * as models from "./models";

const connection = new Database(path.join(__dirname, "db.sqlite"));
export const db = drizzle(connection, { schema: models });
