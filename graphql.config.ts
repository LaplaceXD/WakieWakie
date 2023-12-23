import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  schema: "server/src/modules/**/*.schema.ts",
  documents: ["client/src/**/*.tsx", "!client/src/__generated__/**/*"],
  generates: {
    "server/src/__generated__/gql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../modules/context#GraphQLContext",
        scalars: {
          DateTime: { input: "Date | string | number", output: "Date | string | number" },
          Timetz: { input: "string", output: "string" },
          JSON: { input: "string | object", output: "string | object" },
        },
        mappers: {
          User: "../database#UserModel",
          Conversation: "../database#ConversationModel",
        },
      },
    },
    "client/src/__generated__/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
        gqlTagName: "gql",
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["eslint --fix", "prettier --write"],
  },
} satisfies CodegenConfig;
