import express from 'express';
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";

import {connectionDB} from "./db.js";
import schema from "./schema.js";
// import Car from './models/Car.js';
// import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';



await connectionDB();


const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to my api");
});


// start the apolloServer
const apolloServer = new ApolloServer({
    schema, plugins: [
        //ApolloServerPluginLandingPageDisabled()
    ],
});

await apolloServer.start();

app.use("/graphql", expressMiddleware(apolloServer, {
    //context: async () => ({Car}),
    context: async ({ req }) => ({ token: req.headers.authorization }),
}));


// start the expressServer
const PORT = process.env.PORT || 3000
await app.listen(PORT)
console.log(`Express ready at http://localhost:${PORT}`);
console.log(`Graphql ready at http://localhost:${PORT}/graphql`);
