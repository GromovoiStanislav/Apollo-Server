import {createUser, updateUser, getUser, getUsers, deleteUser} from "../services/user.service.js";
import {getPostsByAuthorId} from "../services/post.service.js";

export const usersResolver = {
    Query: {
        async users(_: any, args: Record<string, any>) {
            return getUsers();
        },
        async user(_: any, args: Record<string, any>) {
            return getUser(args.id);
        },
    },
    Mutation: {
        async createUser(_: any, {input}: Record<string, any>) {
            return createUser({
                email: input.email,
                username: input.username
            });
        },
        async updateUser(_: any, {input}: Record<string, any>) {
            return updateUser({
                id: input.id,
                email: input.email,
                username: input.username
            });
        },
        async deleteUser(_: any, args: Record<string, any>) {
            return deleteUser(args.id);
        },
    },
    User: {
        posts: async (parent) => {
            return getPostsByAuthorId(parent.id);
        }
    }
};
