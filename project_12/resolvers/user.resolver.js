import UserModel from '../models/user.model.js';
import userHelper from '../helpers/user.helper.js';
import jwt from 'jsonwebtoken';
import throwCustomError, {
    ErrorTypes,
} from '../helpers/error-handler.helper.js';
import {GraphQLError} from 'graphql';

const userResolver = {
    Query: {
        // Destructing {total} is same sa args.total
        getUsers: async (parent, {total}, {user}) => {
            try {
                // if (!user) throw new Error('You are not authenticated!');
                const users = await UserModel.find()
                    .sort({createdAt: -1})
                    .limit(total);
                return users;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

        getUserById: async (parent, {id}, {user}) => {
            // if (!user) throw new Error('You are not authenticated!');
            try {
                const user = await UserModel.findById(id);
                return user;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },

    Mutation: {

        signup: async (parent, {input}, context) => {
            const {email, password, fname, lname} = input;
            const isUserExists = await userHelper.isEmailAlreadyExist(email);
            if (isUserExists) {
                throwCustomError(
                    'Email is already Registered',
                    ErrorTypes.ALREADY_EXISTS
                );
            }
            const userToCreate = new UserModel({
                email: email,
                password: password,
                fname: fname,
                lname: lname,
                following: [],
            });
            const user = await userToCreate.save();
            const token = jwt.sign(
                {userId: user._id, email: user.email},
                process.env.JWT_PRIVATE_KEY,
                {expiresIn: process.env.TOKEN_EXPIRY_TIME}
            );

            return {
                __typename: 'UserWithToken', // необязательно
                ...user._doc,
                userJwtToken: {
                    token: token,
                },
            };
        },

        login: async (parent, {input: {email, password}}, context) => {
            const user = await UserModel.findOne({
                $and: [{email: email}, {password: password}],
            });
            if (user) {
                const token = jwt.sign(
                    {userId: user._id, email: user.email},
                    process.env.JWT_PRIVATE_KEY,
                    {expiresIn: process.env.TOKEN_EXPIRY_TIME}
                );
                return {
                    __typename: 'UserWithToken', // необязательно
                    ...user._doc,
                    userJwtToken: {
                        token: token,
                    },
                };
            }
            //if user doesn't exists
            throwCustomError(
                'Invalid email or password entered.',
                ErrorTypes.BAD_USER_INPUT
            );
        },
    },
};

export default userResolver;
