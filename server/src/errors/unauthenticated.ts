import { GraphQLError } from "graphql";

/**
 * Error thrown whenever the user accesses a resource and is authenticated.
 */
export default class extends GraphQLError {
  constructor() {
    super("You must be logged in to access this resource.", {
      extensions: {
        http: { status: 401 },
        code: "UNAUTHENTICATED",
      },
    });
  }
}
