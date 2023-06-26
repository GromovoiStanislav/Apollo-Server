import express from "express";
import {createServer} from 'node:http';

import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";

import {resolvers} from "./resolvers.js";
import {typeDefs} from "./typeDefs.js";
import {connectDb} from "./db.js";


await connectDb();

const app = express();
const httpServer = createServer(app);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

await apolloServer.start();

app.use('/graphql', express.json(), expressMiddleware(apolloServer));

app.get("/", (req, res) => {
    res.send("Welcome to my api");
});

await httpServer.listen(3000)
console.log(`Server ready at http://localhost:3000`);
console.log(`Apollo Server ready at http://localhost:3000/graphql`);







