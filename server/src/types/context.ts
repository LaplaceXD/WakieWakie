import type { UserModel } from "@/database";
import type { Session } from "express-session";

interface SessionData {
  user: UserModel;
}

export interface GraphQLContext {
  session: Session & Partial<SessionData>;
}
