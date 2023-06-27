import {createPost, updatePost, getPost, getPosts, deletePost} from "../services/post.service.js";
import {getUser} from "../services/user.service.js";


export const postsResolver = {
    Query: {
        async posts(_: any, args: Record<string, any>) {
            return getPosts();
        },
        async post(_: any, args: Record<string, any>) {
            return getPost(args.id);
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
    Post: {
        author: async (parent) => {
            return getUser(parent.authorId);
        }
    }
};
