import express from "express";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./graphql/index.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to my api");
});
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});
await apolloServer.start();
app.use("/graphql", expressMiddleware(apolloServer));
const port = process.env.PORT || 4000;
await app.listen(port);
console.log(`Express ready at http://localhost:${port}`);
console.log(`Graphql ready at http://localhost:${port}/graphql`);
