import { QueryResolvers } from "@/__generated__/gql";
import { db, users } from "@/database";
import { UnauthenticatedError } from "@/errors";

const queries: QueryResolvers = {
  me: (_, __, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    return session.user;
  },
  users: (_, __, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    return db.select().from(users);
  },
};

export default queries;