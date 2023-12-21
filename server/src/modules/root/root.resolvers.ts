import { Resolvers } from "@/__generated__/gql";
import { dateTimeScalar, jsonScalar, timetzScalar } from "@/types";

export const resolvers: Resolvers = {
  Timetz: timetzScalar,
  JSON: jsonScalar,
  DateTime: dateTimeScalar,
};
