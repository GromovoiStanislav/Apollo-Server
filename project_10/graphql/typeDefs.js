export const typeDefs = `#graphql
type User {
    id: ID
    username: String,
    email: String,
    token: String
}

input RegisterInput {
    username: String!,
    email: String!,
    password: String! 
}

input LoginInput {
    email: String!,
    password: String! 
}

type Query {
    user(id: ID!): User
    users: [User]
    me: User
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
}
`