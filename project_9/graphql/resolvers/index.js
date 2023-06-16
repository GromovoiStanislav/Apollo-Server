import {messagesResolvers} from "./messages.js";


export const resolvers = {
    Query: {
        ...messagesResolvers.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation
    },
};