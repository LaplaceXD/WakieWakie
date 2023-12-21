import type { User } from "@/database";
import type { Session } from "express-session";

interface SessionData {
  user: User;
}

export interface GraphQLContext {
  session: Session & Partial<SessionData>;
}
