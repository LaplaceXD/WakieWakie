import { GraphQLScalarType, Kind } from "graphql";

const timezScalar = new GraphQLScalarType({
  name: "Timez",
  description:
    "The `Timez` custom scalar type represents time with a corresponding timezone in the format HH:mm+ZZZZ (24-hour).",
  serialize(value) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)\+\d{4}$/;

    if (typeof value === "string" && timeRegex.test(value)) {
      return value;
    }

    throw new Error("GraphQL Time Scalar serializer expected a valid `HH:mm+ZZZZ` time string");
  },
  parseValue(value) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)\+\d{4}$/;

    if (typeof value === "string" && timeRegex.test(value)) {
      return value;
    }

    throw new Error("GraphQL Time Scalar parser expected a valid `HH:mm+ZZZZ` time string");
  },
  parseLiteral(ast) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (ast.kind === Kind.STRING && timeRegex.test(ast.value)) {
      return ast.value; // Parse incoming AST string as is
    }

    return null;
  },
});

export default timezScalar;
