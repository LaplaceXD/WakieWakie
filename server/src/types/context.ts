import type { User } from "@/__generated__/gql";
import type { Session } from "express-session";

interface SessionData {
  user: Omit<User, "__typename">;
}

export interface GraphQLContext {
  session: Session & Partial<SessionData>;
}
