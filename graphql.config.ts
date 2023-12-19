import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  schema: "server/src/modules/**/*.schema.ts",
  generates: {
    "server/src/__generated__/gql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["eslint --fix", "prettier --write"],
  },
} satisfies CodegenConfig;
