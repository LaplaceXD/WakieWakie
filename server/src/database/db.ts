import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as config from "@/config";
import * as models from "./models";

export const connection = postgres(config.db);
export const db = drizzle(connection, { schema: models, logger: true });
