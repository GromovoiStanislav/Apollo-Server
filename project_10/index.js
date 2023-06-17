import 'dotenv/config'
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import mongoose from 'mongoose';

import {typeDefs} from "./graphql/typeDefs.js";
import {resolvers} from "./graphql/resolvers/index.js";
import {getUserFromToken} from "./utils/getUserFromToken.js";


const MONGODB = process.env.DATABASE_URL;
await mongoose.connect(MONGODB)


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 3000},
     //context: ({ req }) => ({ req })
    context: async ({req}) => {
        const userInfo = getUserFromToken(req.headers.authorization);
        return {userInfo};
    }
});
console.log(`Server ready at: ${url}`);

