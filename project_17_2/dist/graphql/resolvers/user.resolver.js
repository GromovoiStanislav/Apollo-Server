import { createUser, updateUser, getUser, getUsers, deleteUser } from "../services/user.service.js";
import { getPostsByAuthorId } from "../services/post.service.js";
export const usersResolver = {
    Query: {
        async users(_, args) {
            return getUsers();
        },
        async user(_, args) {
            return getUser(args.id);
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
    User: {
        posts: async (parent) => {
            return getPostsByAuthorId(parent.id);
        }
    }
};
