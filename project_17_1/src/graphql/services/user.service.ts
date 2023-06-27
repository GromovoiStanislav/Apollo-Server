import {PrismaClient} from "@prisma/client";
import {extractSelection} from "../utils/extractSelections.js";
import {GraphQLResolveInfo} from "graphql";


interface GetUsersArgs {
    info: GraphQLResolveInfo;
}

interface GetUserArgs extends GetUsersArgs {
    id: string;
}

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

export const getUsers = async ({info}: GetUsersArgs) => {
    const extractedSelections = extractSelection(info);
    const postsIncluded = extractedSelections.includes("posts");

    if (postsIncluded) {
        return await prisma.user.findMany({include: {posts: true}});
    }

    return await prisma.user.findMany();
};


export const getUser = async ({id, info}: GetUserArgs) => {
    const extractedSelections = extractSelection(info);
    const postsIncluded = extractedSelections.includes("posts");

    if (postsIncluded) {
        return await prisma.user.findUnique({where: {id}, include: {posts: true}});
    }

    return await prisma.user.findUnique({where: {id}});
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
}
