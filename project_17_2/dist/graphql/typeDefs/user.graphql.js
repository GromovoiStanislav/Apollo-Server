export const userTypes = `
type User {
  id: String!
  email: String!
  username: String
  posts: [Post]
}

input UserInput {
  email: String!
  username: String
}

input UpdateUserInput {
  id: String!
  email: String
  username: String
}

type Query {
  user(id: String!): User
  users: [User]
}

type Mutation {
  createUser(input: UserInput!): User
  updateUser(input: UpdateUserInput!): User
  deleteUser(id: String!): User
}
`;
