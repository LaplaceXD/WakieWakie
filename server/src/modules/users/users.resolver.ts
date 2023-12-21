import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

import { Resolvers } from "@/__generated__/gql";
import { db } from "@/database";

export const resolvers: Resolvers = {
  User: {
    auth: async ({ id }) => {
      const result = await db.query.auth.findFirst({
        where: ({ id: authId }, { eq }) => eq(authId, id),
        columns: {
          password: false,
          status: false,
          id: false,
        },
      });
      if (!result) {
        throw new GraphQLError("Auth does not have a corresponding user details in the database.", {
          extensions: {
            http: { status: 500 },
            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
          },
        });
      }

      return result;
    },
  },
};
