import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

import {resolvers as UserResolvers} from "./UserResolvers.js";
import {resolvers as UploadResolver} from "./UploadResolver.js";

export const resolvers = [UserResolvers, {Upload: GraphQLUpload}, UploadResolver];


