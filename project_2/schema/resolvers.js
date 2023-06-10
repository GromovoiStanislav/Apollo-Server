import pkg from 'lodash';
import {MovieList, UserList} from "../FakeData.js";

const {find, filter, remove} = pkg;

export const resolvers = {
    Query: {
        // USER RESOLVERS
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            return find(UserList, {id: Number(id)});
        },

        // MOVIE RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            return find(MovieList, {name});
        },
    },
    User: {
        favoriteMovies: () => {
            return filter(
                MovieList,
                (movie) =>
                    movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
            );
        },
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            const {id, newUsername} = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUsername;
                    userUpdated = user;
                }
            });

            return userUpdated;
        },

        deleteUser: (parent, args) => {
            const id = args.id;
            remove(UserList, (user) => user.id === Number(id));
            return null;
        },
    },
};

