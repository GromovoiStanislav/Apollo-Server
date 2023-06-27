import { PrismaClient } from "@prisma/client";
import { extractSelection } from "../utils/extractSelections.js";
const prisma = new PrismaClient();
export const getUsers = async ({ info }) => {
    const extractedSelections = extractSelection(info);
    const postsIncluded = extractedSelections.includes("posts");
    if (postsIncluded) {
        return await prisma.user.findMany({ include: { posts: true } });
    }
    return await prisma.user.findMany();
};
export const getUser = async ({ id, info }) => {
    const extractedSelections = extractSelection(info);
    const postsIncluded = extractedSelections.includes("posts");
    if (postsIncluded) {
        return await prisma.user.findUnique({ where: { id }, include: { posts: true } });
    }
    return await prisma.user.findUnique({ where: { id } });
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
