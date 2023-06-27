import { createPost, updatePost, getPost, getPosts, deletePost } from "../services/post.service.js";
import { getUser } from "../services/user.service.js";
export const postsResolver = {
    Query: {
        async posts(_, args) {
            return getPosts();
        },
        async post(_, args) {
            return getPost(args.id);
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
    Post: {
        author: async (parent) => {
            return getUser(parent.authorId);
        }
    }
};
