import {ApolloServer} from "@apollo/server";

import {typeDefs} from "./TypeDefs/index.js";
import {resolvers} from "./Resolvers/index.js";

export const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});


