import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import app from "./app.js";
import { connectionDB } from "./db.js";
import { typeDefs, resolvers } from "./graphql/schema.js";
import {PORT} from './config.js'


async function startServer() {
  await connectionDB();

  const apolloServer  = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));


  await app.listen(PORT)
  console.log(`Express ready at http://localhost:${PORT}`);
  console.log(`Graphql ready at http://localhost:${PORT}/graphql`);
}

startServer();
