import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
   type ValidationError {
    field: String
    msg: String
  }

  type TimeoutError {
    reason: String
    seconds: Int
  }

  union Error = ValidationError | TimeoutError

  type Mutation {
    register: Error
  }

  type Query {
    hello: String
  }
`;

let showTimeoutError = false;

const resolvers = {
  Error: {
    __resolveType: obj => {
      if (obj.reason) {
        return "TimeoutError";
      }

      if (obj.field) {
        return "ValidationError";
      }

      return null;
    }
  },
  Query: { hello: () => "hi" },
  Mutation: {
    register: () => {
      let error = {};

      if (showTimeoutError) {
        error = { reason: "too many requests", seconds: 180 };
      } else {
        error = { field: "email", msg: "already taken" };
      }

      showTimeoutError = !showTimeoutError;

      return error;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Server ready at: ${url}`);
