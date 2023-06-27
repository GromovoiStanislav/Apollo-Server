import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getUsers = async () => {
    return prisma.user.findMany();
};
export const getUser = async (id) => {
    return prisma.user.findUnique({
        where: { id }
    });
};
export const createUser = async ({ email, username }) => {
    return prisma.user.create({
        data: {
            email,
            username,
        },
    });
};
export const updateUser = async ({ id, email, username }) => {
    return prisma.user.update({
        where: { id },
        data: {
            email, username
        },
    }).catch(() => null);
};
export const deleteUser = async (id) => {
    return prisma.user.delete({
        where: {
            id
        }
    }).catch(() => null);
};
export const getUserPosts = async (authorId) => {
    return prisma.post.findMany({
        where: { authorId }
    });
};
