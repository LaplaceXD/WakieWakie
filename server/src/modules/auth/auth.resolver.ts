import { Resolvers } from "@/__generated__/gql";
import { auth, db } from "@/database";
import { InternalServerError } from "@/errors";

import { eq } from "drizzle-orm";
import Mutation from "./auth.mutation";
import Query from "./auth.query";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  User: {
    account: async ({ id }) => {
      try {
        const [result] = await db
          .select({
            id: auth.id,
            username: auth.username,
            email: auth.email,
            lastLogin: auth.lastLogin,
          })
          .from(auth)
          .where(eq(auth.id, id));
        if (!result) throw new Error(`User ${id} does not have a corresponding user details in the database.`);

        return result;
      } catch (err) {
        throw new InternalServerError(err as Error);
      }
    },
  },
};
