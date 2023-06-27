import {PrismaClient} from "@prisma/client";

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

export const getPosts = async () => {
    return prisma.post.findMany({});
};


export const getPost = async (id) => {
    return prisma.post.findUnique({
        where: {id}
    });
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

export const getPostsByAuthorId = async (authorId: string) => {
    return prisma.post.findMany({
        where: {authorId}
    })
};