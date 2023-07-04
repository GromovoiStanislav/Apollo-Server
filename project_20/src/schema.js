import {makeExecutableSchema} from "@graphql-tools/schema";
import resolvers from "./resolvers.js";


const typeDefs = /* GraphQL */`
    type Car {
        _id: String!
        name: String!
    }

    type Query {
        allCars: [Car!]!
        myToken: String
    }

    type Mutation {
        createCar(name: String!): Car!
    }
`;


export default makeExecutableSchema({
    typeDefs,
    resolvers
})