import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {typeDefs} from "./schema.js";
import {Query} from "./resolvers/Query.js";
import {Mutation} from "./resolvers/Mutation.js";
import {Category} from "./resolvers/Category.js";
import {Product} from "./resolvers/Product.js";


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product,
  }
});

const {url} = await startStandaloneServer(server, {
  listen: {port: 3000},
});
console.log(`Server ready at: ${url}`);