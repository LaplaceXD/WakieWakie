import "dotenv/config";

import cors from "cors";
import express from "express";
import session from "express-session";
import { createServer } from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import * as config from "@/config";
import { connection } from "@/database";
import * as root from "@/modules/root";
import * as users from "@/modules/users";
import { GraphQLContext } from "./types";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cors(config.cors));
app.use(session(config.session));

// This setting is required for graphiql playground
// to work with cookies in development environments
if (process.env["NODE_ENV"] !== "production") {
  // trust x-forwarded-* headers
  app.set("trust proxy", 1);
  // set x-forward-proto to simulate a secure http connection
  app.use((req, _, next) => {
    req.headers["x-forwarded-proto"] = "https";
    return next();
  });
}

const server = new ApolloServer<GraphQLContext>({
  typeDefs: [root.typeDefs, users.typeDefs],
  resolvers: {
    ...root.resolvers,
    Query: {
      ...users.queries,
    },
    Mutation: {
      ...users.mutations,
    },
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await connection.end({ timeout: 10_000 });
          },
        };
      },
    },
  ],
});

const PORT = parseInt(process.env["PORT"] || "4000");
server.start().then(() => {
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ session: req.session }),
    }),
  );

  return httpServer.listen(PORT, () => {
    console.log(`🚀  Server ready at: http://localhost:${PORT}`);
  });
});
