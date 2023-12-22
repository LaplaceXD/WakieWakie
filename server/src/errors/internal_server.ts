import { Maybe } from "@/__generated__/gql";
import { GraphQLError } from "graphql";

/**
 * Wrapper error for errors that were not handled, or was unexpected from the
 * application.
 */
export default class extends GraphQLError {
  constructor(originalError: Maybe<Error & { readonly extensions?: unknown }>) {
    super("An unexpected error occured.", {
      extensions: {
        http: { status: 500 },
        code: "INTERNAL_SERVER_ERROR",
      },
      originalError,
    });
  }
}
