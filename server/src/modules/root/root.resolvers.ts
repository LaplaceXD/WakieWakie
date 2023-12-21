import { Resolvers } from "@/__generated__/gql";
import { dateScalar, jsonScalar, timetzScalar } from "@/types";

export const resolvers: Resolvers = {
  Timetz: timetzScalar,
  JSON: jsonScalar,
  Date: dateScalar,
};
