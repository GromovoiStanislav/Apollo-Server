import {usersResolver} from "./resolvers/user.resolver.js";
import {postsResolver} from "./resolvers/post.resolver.js";
import {userTypes} from "./typeDefs/user.graphql.js";
import {postTypes} from "./typeDefs/post.graphql.js";


export const typeDefs = `#graphql
    ${userTypes}
    ${postTypes}
`;

export const resolvers = {
  Query: {
    ...usersResolver.Query,
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
  },
};
