import { userLoader } from "../loaders/userLoader.js";
import {Context} from "../index.js";

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: (parent: PostParentType, __: any, { prisma }: Context) => {
    return userLoader.load(parent.authorId);
  },
};
