import { userLoader } from "../loaders/userLoader.js";
export const Post = {
    user: (parent, __, { prisma }) => {
        return userLoader.load(parent.authorId);
    },
};
