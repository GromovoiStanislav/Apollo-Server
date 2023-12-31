import gql from 'graphql-tag';

const userSchema = gql`
  scalar DateTime
  
  input SignupInput {
    email: String!
    password: String!
    fname: String!
    lname: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers(total: Int): [User]
    getUserById(id: ID!): User!
  }

  type JwtToken {
    token: String!
  }

  type User {
    _id: String
    email: String
    password: String
    fname: String
    lname: String
    following: [String]
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  
  type UserWithToken {
    _id: String
    email: String
    fname: String
    lname: String
    following: [String]
    createdAt: DateTime
    updatedAt: DateTime
    userJwtToken: JwtToken
  }

  type Mutation {
    login(input: LoginInput): UserWithToken
    signup(input: SignupInput): UserWithToken
  }
`;

export default userSchema;
