import { Resolvers } from "@/__generated__/gql";
import { jsonScalar, timezScalar } from "@/types";

export const resolvers: Resolvers = {
  Timez: timezScalar,
  JSON: jsonScalar,
};
