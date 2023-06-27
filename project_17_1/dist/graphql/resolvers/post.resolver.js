import { createPost, updatePost, getPost, getPosts, deletePost } from "../services/post.service.js";
export const postsResolver = {
    Query: {
        async posts(_, args, context, info) {
            return getPosts({ info });
        },
        async post(_, args, context, info) {
            return getPost({ id: args.id, info });
        },
    },
    Mutation: {
        async createPost(_, { input }) {
            return createPost({
                authorId: input.authorId,
                title: input.title,
                content: input.content,
            });
        },
        async updatePost(_, { input }) {
            return updatePost({
                id: input.id,
                title: input.title,
                content: input.content,
                authorId: input.authorId,
            });
        },
        async deletePost(_, args) {
            return deletePost(args.id);
        },
    },
};
