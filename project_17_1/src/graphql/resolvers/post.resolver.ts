import {GraphQLResolveInfo} from "graphql";
import {createPost, updatePost, getPost, getPosts, deletePost} from "../services/post.service.js";


export const postsResolver = {
    Query: {
        async posts(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return getPosts({info});
        },
        async post(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return getPost({id: args.id, info});
        },
    },
    Mutation: {
        async createPost(_: any, {input}: Record<string, any>) {
            return createPost({
                authorId: input.authorId,
                title: input.title,
                content: input.content,
            });
        },
        async updatePost(_: any, {input}: Record<string, any>) {
            return updatePost({
                id: input.id,
                title: input.title,
                content: input.content,
                authorId: input.authorId,
            });
        },
        async deletePost(_: any, args: Record<string, any>) {
            return deletePost(args.id);
        },
    },
};
