import { users } from "@/database";
import type { Session } from "express-session";

interface SessionData {
  user: typeof users.$inferSelect;
}

export interface GraphQLContext {
  session: Session & Partial<SessionData>;
}
