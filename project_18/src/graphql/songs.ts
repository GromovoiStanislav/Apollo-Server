import Song from "../models/song.model.js";

export const typeDefs = `#graphql
type Song {
    id: ID
    name: String
    author: String
    genre: String
}

type Query {
    getSongs: [Song!]!
    getSong(id:ID!): Song
}

input InputSong {
    name: String!
    genre: String!
    author: String!
}

type Mutation {
    uploadSong(input: InputSong): Song
    deleteSong(id: ID!): Song
}
`;

export const resolvers = {
    Query: {
        getSongs: async () => {
            return Song.find();
        },
        getSong: async (_, {id}) => {
            return Song.findById(id);
        },
    },
    Mutation: {
        async uploadSong(_: any, args: any) {
            const {name, genre, author} = args.input;
            const newSong = new Song({
                name,
                genre,
                author,
            });
            return newSong.save();
        },
        deleteSong: async (_, {id}) => {
            return Song.findByIdAndDelete(id);
        },
    },
};
