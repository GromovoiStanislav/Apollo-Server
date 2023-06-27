import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";

import {typeDefs} from "./graphql/typeDefs.js";
import {resolvers} from "./graphql/resolvers.js";
import { PORT } from "./config.js";

export async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  app.use("/graphql", express.json(), expressMiddleware(apolloServer));

  app.get("/", (req, res) => {
    res.send("Welcome to my api");
  });

  await httpServer.listen( PORT );
  console.log(`Server ready at http://localhost:${PORT}`);
  console.log(`Apollo Server ready at http://localhost:${PORT}/graphql`);
}
