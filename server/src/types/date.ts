import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "The `Date` custom scalar type Datetime objects, it represents time in ISO string format.",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    } else if (typeof value === "string") {
      return new Date(value).toISOString();
    }

    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number" || typeof value === "string") {
      return new Date(value);
    }

    throw new Error("GraphQL Date Scalar parser expected a `number` or a `string`.");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    } else if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    return null;
  },
});

export default dateScalar;
