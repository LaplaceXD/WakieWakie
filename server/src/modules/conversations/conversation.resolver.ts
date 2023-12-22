import { Resolvers } from "@/__generated__/gql";
import { db } from "@/database";

import Mutation from "./conversation.mutation";

export const resolvers: Resolvers = {
  Mutation,
  Conversation: {
    users: ({ id }) => {
      return db.query.conversationUsers.findMany({
        where: ({ conversationId }, { eq }) => eq(conversationId, id),
      });
    },
  },
};
