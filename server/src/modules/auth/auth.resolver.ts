import { Resolvers } from "@/__generated__/gql";
import { db } from "@/database";
import { InternalServerError } from "@/errors";

import Mutation from "./auth.mutation";
import Query from "./auth.query";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  User: {
    account: async ({ id }) => {
      try {
        const result = await db.query.auth.findFirst({
          where: ({ id: authId }, { eq }) => eq(authId, id),
          columns: { password: false, deletedAt: false },
        });
        if (!result) throw new Error(`User ${id} does not have a corresponding user details in the database.`);

        return result;
      } catch (err) {
        throw new InternalServerError(err as Error);
      }
    },
  },
};
