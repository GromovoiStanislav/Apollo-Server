import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {buildSchema} from "type-graphql";

import {PingResolver} from "./resolvers/ping.js";
import {ProductResolver} from "./resolvers/ProductResolver.js";

export const startServer = async () => {
    const app = express();
    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Welcome to my api");
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PingResolver, ProductResolver],
            validate: false
        })
    });

    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer))

    return app;

    // const port = process.env.PORT || 3000;
    // await app.listen(port)
    // console.log(`Express ready at http://localhost:${port}`);
    // console.log(`Graphql ready at http://localhost:${port}/graphql`);
}