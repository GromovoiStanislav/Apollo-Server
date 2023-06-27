import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getPosts = async () => {
    return prisma.post.findMany({});
};
export const getPost = async (id) => {
    return prisma.post.findUnique({
        where: { id }
    });
};
export const createPost = async ({ authorId, title, content }) => {
    return prisma.post.create({
        data: {
            title,
            content,
            authorId
        },
    });
};
export const updatePost = async ({ id, title, content, authorId }) => {
    return prisma.post.update({
        where: { id },
        data: {
            title, content, authorId
        },
    }).catch(() => null);
};
export const deletePost = async (id) => {
    return prisma.post.delete({
        where: {
            id
        }
    }).catch(() => null);
};
export const getPostsByAuthorId = async (authorId) => {
    return prisma.post.findMany({
        where: { authorId }
    });
};
