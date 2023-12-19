import { Resolvers } from "@/__generated__/gql";

export const resolvers: Resolvers = {
  Query: {
    books: () => [
      {
        title: "The Awakening",
        author: "Kate Chopin",
      },
      {
        title: "City of Glass",
        author: "Paul Auster",
      },
    ],
  },
};
