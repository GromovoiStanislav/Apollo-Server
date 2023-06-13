import 'dotenv/config'
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {PrismaClient, Prisma} from '@prisma/client';


import {typeDefs} from "./schema.js";
import {getUserFromToken} from "./utils/getUserFromToken.js";
import {Query} from "./resolvers/Query.js";
import {Mutation} from "./resolvers/Mutation/Mutation.js";
import {Profile} from "./resolvers/Profile.js";
import {Post} from "./resolvers/Post.js";
import {User} from "./resolvers/User.js";




export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
    userInfo: {
        userId: number;
    } | null;
}

const server = new ApolloServer<Context>({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Profile,
        Post,
        User,
    }
});


const {url} = await startStandaloneServer(server, {
    listen: {port: 3000},
    context: async ({req}: any): Promise<Context> => {
        const userInfo = getUserFromToken(req.headers.authorization);
        return {
            prisma,
            userInfo,
        };
    }
});
console.log(`Server ready at: ${url}`);
