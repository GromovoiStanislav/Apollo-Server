import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

import {typeDefs} from "./schema.js";
import {Query} from "./resolvers/Query.js";
import {Mutation} from "./resolvers/Mutation.js";
import {Animal} from "./resolvers/Animal.js";
import {Category} from "./resolvers/Category.js";


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Animal,
        Category
    }
});


const {url} = await startStandaloneServer(server, {
    listen: {port: 3000},
});
console.log(`Server ready at: ${url}`);