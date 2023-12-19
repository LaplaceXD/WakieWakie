import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import cors from "cors";
import express from "express";
import { createServer } from "http";

import { resolvers } from "./modules/auth/auth.resolvers";
import { typeDefs } from "./modules/auth/auth.schema";

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: [resolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors({ origin: ["http://localhost:5173"], credentials: true }),
  express.json(),
  expressMiddleware(server),
);

httpServer.listen(4000, () => {
  console.log(`🚀  Server ready at: http://localhost:4000`);
});
