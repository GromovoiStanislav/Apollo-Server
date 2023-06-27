import { createUser, updateUser, getUser, getUsers, deleteUser } from "../services/user.service.js";
export const usersResolver = {
    Query: {
        async users(_, args, context, info) {
            return getUsers({ info });
        },
        async user(_, args, context, info) {
            return getUser({ id: args.id, info });
        },
    },
    Mutation: {
        async createUser(_, { input }) {
            return createUser({
                email: input.email,
                username: input.username
            });
        },
        async updateUser(_, { input }) {
            return updateUser({
                id: input.id,
                email: input.email,
                username: input.username
            });
        },
        async deleteUser(_, args) {
            return deleteUser(args.id);
        },
    },
};
