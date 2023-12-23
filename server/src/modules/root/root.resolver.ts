import { Resolvers } from "@/__generated__/gql";
import { dateTimeScalar, jsonScalar, timetzScalar } from "./scalars";

import Query from "./root.query";

export const resolvers: Resolvers = {
  Timetz: timetzScalar,
  JSON: jsonScalar,
  DateTime: dateTimeScalar,
  Query,
};
