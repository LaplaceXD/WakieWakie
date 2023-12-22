import { Resolvers } from "@/__generated__/gql";

import Mutation from "./notification.mutation";
import Query from "./notification.query";
import Subscription from "./notification.subscription";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
};
