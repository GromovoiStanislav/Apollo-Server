import {GraphQLResolveInfo} from "graphql";
import {createUser, updateUser, getUser, getUsers, deleteUser} from "../services/user.service.js";


export const usersResolver = {
    Query: {
        async users(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return getUsers({info});
        },
        async user(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return getUser({id: args.id, info});
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

};
