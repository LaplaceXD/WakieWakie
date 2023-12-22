import "dotenv/config";

import cors from "cors";
import express from "express";
import session from "express-session";
import { createServer } from "http";
import type { AddressInfo } from "net";

import { ApolloServer } from "@apollo/server";
import { unwrapResolverError } from "@apollo/server/errors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

import * as auth from "@/modules/auth";
import type { GraphQLContext } from "@/modules/context";
import * as message from "@/modules/messages";
import * as root from "@/modules/root";

import * as config from "@/config";
import { connection as pgsqlClient } from "@/database";
import { InternalServerError } from "@/errors";

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

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([root.typeDefs, auth.typeDefs, message.typeDefs]),
  resolvers: mergeResolvers([root.resolvers, auth.resolvers, message.resolvers]),
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const wsServerCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<GraphQLContext>({
  schema,
  formatError(formattedError, error) {
    if (unwrapResolverError(error) instanceof InternalServerError) {
      console.log(unwrapResolverError(error));
    }

    return formattedError;
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await Promise.all([pgsqlClient.end({ timeout: 10_000 }), wsServerCleanup.dispose()]);
          },
        };
      },
    },
  ],
});

const PORT = parseInt(process.env["PORT"] || "4000");
server.start().then(() => {
  const pubsub = new PubSub();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ session: req.session, pubsub }),
    }),
  );

  return httpServer.listen(PORT, () => {
    const addressInfo = httpServer.address();
    if (!addressInfo) {
      console.log("💩 Server has not yet started!");
      return;
    }

    const { address, port } = addressInfo as AddressInfo;
    const isLocalHost = address === "127.0.0.1" || address === "::";
    const name = `${isLocalHost ? "localhost" : address}:${port}`;

    console.log(`🚀  Server ready at: http://${name}`);
    console.log(`🌑  Apollo Playground and GraphQL ready at: http://${name}/graphql`);
    console.log(`👂  WebSockets ready at: ws://${name}/graphql`);
  });
});
