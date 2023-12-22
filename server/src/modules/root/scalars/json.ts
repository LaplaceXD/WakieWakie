import { GraphQLScalarType, Kind } from "graphql";

const jsonScalar = new GraphQLScalarType({
  name: "JSON",
  description:
    "The `JSON` scalar type is a representation of JSON objects, if the string is not parsable it returns the string as-is.",
  serialize(value) {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    throw new Error("GraphQL JSON Scalar serializer expected a string.");
  },
  parseValue(value) {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    throw new Error("GraphQL JSON Scalar parser expected a string.");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      try {
        return JSON.parse(ast.value);
      } catch {
        return ast.value;
      }
    }

    return null;
  },
});

export default jsonScalar;
