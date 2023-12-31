import { canUserMutatePost } from "../../utils/canUserMutatePost.js";
export const postResolvers = {
    postCreate: async (_, { post }, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "Forbidden access (unauthenticated)",
                    },
                ],
                post: null,
            };
        }
        const { title, content } = post;
        if (!title || !content) {
            return {
                userErrors: [
                    {
                        message: "You must provide title and content to create a post",
                    },
                ],
                post: null,
            };
        }
        return {
            userErrors: [],
            post: prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: userInfo.userId,
                },
            }),
        };
    },
    postUpdate: async (_, { post, postId }, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "Forbidden access (unauthenticated)",
                    },
                ],
                post: null,
            };
        }
        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma,
        });
        if (error)
            return error;
        const { title, content } = post;
        if (!title && !content) {
            return {
                userErrors: [
                    {
                        message: "Need to have at least on e field to update",
                    },
                ],
                post: null,
            };
        }
        const existingPost = await prisma.post.findUnique({
            where: {
                id: Number(postId),
            },
        });
        if (!existingPost) {
            return {
                userErrors: [
                    {
                        message: "Post does not exist",
                    },
                ],
                post: null,
            };
        }
        let payloadToUpdate = {
            title,
            content,
        };
        if (!title)
            delete payloadToUpdate.title;
        if (!content)
            delete payloadToUpdate.content;
        return {
            userErrors: [],
            post: prisma.post.update({
                data: {
                    ...payloadToUpdate,
                },
                where: {
                    id: Number(postId),
                },
            }),
        };
    },
    postDelete: async (_, { postId }, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "Forbidden access (unauthenticated)",
                    },
                ],
                post: null,
            };
        }
        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma,
        });
        if (error)
            return error;
        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId),
            },
        });
        if (!post) {
            return {
                userErrors: [
                    {
                        message: "Post does not exist",
                    },
                ],
                post: null,
            };
        }
        await prisma.post.delete({
            where: {
                id: Number(postId),
            },
        });
        return {
            userErrors: [],
            post,
        };
    },
    postPublish: async (_, { postId }, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "Forbidden access (unauthenticated)",
                    },
                ],
                post: null,
            };
        }
        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma,
        });
        if (error)
            return error;
        return {
            userErrors: [],
            post: prisma.post.update({
                where: {
                    id: Number(postId),
                },
                data: {
                    published: true,
                },
            }),
        };
    },
    postUnpublish: async (_, { postId }, { prisma, userInfo }) => {
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "Forbidden access (unauthenticated)",
                    },
                ],
                post: null,
            };
        }
        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma,
        });
        if (error)
            return error;
        return {
            userErrors: [],
            post: prisma.post.update({
                where: {
                    id: Number(postId),
                },
                data: {
                    published: false,
                },
            }),
        };
    },
};
