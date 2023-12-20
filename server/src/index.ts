import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import cors from "cors";
import express from "express";
import { createServer } from "http";

import * as root from "@/modules/root";
import * as users from "@/modules/users";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer({
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
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors({ origin: ["http://localhost:5173"], credentials: true }),
    express.json(),
    expressMiddleware(server),
  );

  return httpServer.listen(4000, () => {
    console.log(`🚀  Server ready at: http://localhost:4000`);
  });
}

startServer();
