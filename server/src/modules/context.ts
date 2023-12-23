import type { UserModel } from "@/database";
import type { Session } from "express-session";
import type { PubSub } from "graphql-subscriptions";

interface SessionData {
  user: UserModel;
}

export interface GraphQLContext {
  session: Session & Partial<SessionData>;
  pubsub: PubSub;
}
