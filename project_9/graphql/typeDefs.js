export const typeDefs = `#graphql
type Message {
    id: ID
    text: String
    createdAt: String
    createdBy: String
}

input MessageInput {
    text: String
    username: String
}

type Query {
    messages: [Message]
    message(id: ID!): Message
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
}
`