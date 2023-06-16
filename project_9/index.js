import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import mongoose from 'mongoose';

import {typeDefs} from "./graphql/typeDefs.js";
import {resolvers} from "./graphql/resolvers/index.js";


const MONGODB = "mongodb://localhost/node_search";
await mongoose.connect(MONGODB)


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 3000},
});
console.log(`Server ready at: ${url}`);

