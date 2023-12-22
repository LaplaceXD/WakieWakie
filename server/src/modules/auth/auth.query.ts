import { QueryResolvers } from "@/__generated__/gql";
import { UnauthenticatedError } from "@/errors";

export const queries: QueryResolvers = {
  me: (_, __, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    return session.user;
  },
};
