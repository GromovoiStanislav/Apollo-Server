export const resolvers = {
    Query: {
        greetings: (_, {name}) => "Hello "+name,
    },
};

