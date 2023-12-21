import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  schema: "server/src/modules/**/*.schema.ts",
  generates: {
    "server/src/__generated__/gql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../types#GraphQLContext",
        scalars: {
          DateTime: { input: "Date | string | number", output: "Date | string | number" },
          Timetz: { input: "string", output: "string" },
          JSON: { input: "string | object", output: "string | object" },
        },
        mappers: {
          User: "../database#User",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["eslint --fix", "prettier --write"],
  },
} satisfies CodegenConfig;
