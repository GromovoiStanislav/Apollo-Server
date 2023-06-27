export const postTypes = `
type Post {
  id: String
  title: String
  content: String
  authorId: String
  author: User
}

type Query {
  post(id: String!): Post
  posts: [Post]
}

input PostInput {
  authorId: String!
  title: String!
  content: String!
}

input UpdatePostInput {
  id: String!
  title: String
  content: String
  authorId: String
}

type Mutation {
  createPost(input: PostInput!): Post
  updatePost(input: UpdatePostInput!): Post
  deletePost(id: String!): Post
}
`;