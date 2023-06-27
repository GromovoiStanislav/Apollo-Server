import { PrismaClient } from "@prisma/client";
import { extractSelection } from "../utils/extractSelections.js";
const prisma = new PrismaClient();
export const getPosts = async ({ info }) => {
    const extractedSelections = extractSelection(info);
    const authorIncluded = extractedSelections.includes("author");
    if (authorIncluded) {
        return await prisma.post.findMany({ include: { author: true } });
    }
    return await prisma.post.findMany();
};
export const getPost = async ({ id, info }) => {
    const extractedSelections = extractSelection(info);
    const authorIncluded = extractedSelections.includes("author");
    if (authorIncluded) {
        return await prisma.post.findUnique({ where: { id }, include: { author: true } });
    }
    return await prisma.post.findUnique({ where: { id } });
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
