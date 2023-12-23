import { GraphQLError } from "graphql";

/**
 * Error thrown whenever the user accesses a resource and does not have
 * enough privileges.
 */
export default class extends GraphQLError {
  constructor() {
    super("You must have the necessary permissions to access this resource.", {
      extensions: {
        http: { status: 403 },
        code: "FORBIDDEN",
      },
    });
  }
}
