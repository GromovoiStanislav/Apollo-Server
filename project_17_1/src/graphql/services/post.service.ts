import {PrismaClient} from "@prisma/client";
import {extractSelection} from "../utils/extractSelections.js";
import {GraphQLResolveInfo} from "graphql";

interface GetPostsArgs {
    info: GraphQLResolveInfo;
}

interface GetPostArgs extends GetPostsArgs {
    id: string;
}

interface PostInput {
    authorId: string;
    title: string;
    content: string;
}

interface UpdatePostInput {
    id: string;
    authorId?: string;
    title?: string;
    content?: string;
}

const prisma = new PrismaClient();

export const getPosts = async ({info}: GetPostsArgs) => {
    const extractedSelections = extractSelection(info);
    const authorIncluded = extractedSelections.includes("author");

    if (authorIncluded) {
        return await prisma.post.findMany({include: {author: true}});
    }

    return await prisma.post.findMany();
};


export const getPost = async ({id, info}: GetPostArgs) => {
    const extractedSelections = extractSelection(info);
    const authorIncluded = extractedSelections.includes("author");

    if (authorIncluded) {
        return await prisma.post.findUnique({where: {id}, include: {author: true}});
    }

    return await prisma.post.findUnique({where: {id}});
};


export const createPost = async ({authorId, title, content}: PostInput) => {
    return prisma.post.create({
        data: {
            title,
            content,
            authorId
        },
    });
};

export const updatePost = async ({id, title, content, authorId}: UpdatePostInput) => {
    return prisma.post.update({
        where: {id},
        data: {
            title, content, authorId
        },
    }).catch(() => null);
};


export const deletePost = async (id: string) => {
    return prisma.post.delete({
        where: {
            id
        }
    }).catch(() => null);
}