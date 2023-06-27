import {PrismaClient} from "@prisma/client";

interface UserInput {
    email: string;
    username?: string;
}

interface UpdateUserInput {
    id: string,
    email?: string;
    username?: string;
}

const prisma = new PrismaClient();

export const getUsers = async () => {
    return prisma.user.findMany();
};


export const getUser = async (id: string) => {
    return prisma.user.findUnique({
        where: {id}
    });
};


export const createUser = async ({email, username}: UserInput) => {
    return prisma.user.create({
        data: {
            email,
            username,
        },
    });
};


export const updateUser = async ({id, email, username}: UpdateUserInput) => {
    return prisma.user.update({
        where: {id},
        data: {
            email, username
        },
    }).catch(() => null);
};


export const deleteUser = async (id: string) => {
    return prisma.user.delete({
        where: {
            id
        }
    }).catch(() => null);
};


export const getUserPosts = async (authorId: string) => {
    return prisma.post.findMany({
        where: {authorId}
    })
};