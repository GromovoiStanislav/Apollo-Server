import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {prisma} from './db.js'


async function main() {

    const typeDefs = `#graphql
        type Post {
            id: String
            title: String
            username: String
        }

        type Query {
            getAllPosts: [Post]
        }

        type Mutation {
            createPost(title: String, username: String): Post
        }
    `

    interface createPostInput {
        title: string
        username: string
    }

    const resolvers = {
        Mutation: {
            createPost: async (_parent: any, args: createPostInput) => {
                const post = await prisma.post.create({
                    data: {
                        title: args.title,
                        username: args.username
                    }
                });

                return post;
            }
        },
        Query: {
            getAllPosts: async () => {
                return await prisma.post.findMany();
            }
        }
    }


    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    const {url} = await startStandaloneServer(server, {
        listen: {port: 3000}
    });
    console.log("Server is ready at " + url);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })