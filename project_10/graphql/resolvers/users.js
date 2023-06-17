import {GraphQLError} from "graphql";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose'
import validator from "validator";
import User from '../../models/User.js'

export const usersResolvers = {
    Mutation: {

        async registerUser(_, {registerInput: {username, email, password}}) {
            // validation
            const isEmail = validator.isEmail(email);
            if (!isEmail) {
                throw new GraphQLError('Incorrect email: ' + email, {
                    extensions: {
                        code: "400_INCORRECT_EMAIL"
                    }
                });
            }
            const isValidPassword = validator.isLength(password, {min: 3,});
            if (!isValidPassword) {
                throw new GraphQLError('Incorrect password', {
                    extensions: {
                        code: "400_INCORRECT_PASSWORD"
                    }
                });
            }
            const isValidUsername = validator.isLength(username, {min: 3,});
            if (!isValidUsername) {
                throw new GraphQLError('Incorrect username', {
                    extensions: {
                        code: "400_INCORRECT_USERNAM"
                    }
                });
            }


            const oldUser = await User.findOne({email});
            if (oldUser) {
                throw new GraphQLError('A user is already registered with the email: ' + email, {
                    extensions: {
                        code: "409_USER_ALREADY_EXISTS"
                    }
                });
            }

            const newUser = new User({
                username: username, email: email.toLowerCase(), password: await bcrypt.hash(password, 10)
            });

            newUser.token = jwt.sign({user_id: newUser._id, email}, process.env.JSON_SIGNATURE, {
                expiresIn: "2h",
            });

            const res = await newUser.save();

            return {
                id: res.id, ...res._doc
            };
        },


        async loginUser(_, {loginInput: {email, password}}) {
            const user = await User.findOne({email});
            if (user && (await bcrypt.compare(password, user.password))) {
                user.token = jwt.sign({user_id: user._id, email}, process.env.JSON_SIGNATURE, {
                    expiresIn: "2h",
                });

                return {
                    id: user.id, ...user._doc
                }
            } else {
                throw new GraphQLError('Incorrect password', {
                    extensions: {
                        code: "400_INCORRECT_PASSWORD"
                    }
                });
            }
        }
    },

    Query: {

        user: async (_, {id}) => {
            if (mongoose.Types.ObjectId.isValid(id)) {
                return User.findById(id)
            } else {
                throw new GraphQLError('Id not valid', {
                    extensions: {
                        code: "400_BAD_REQUEST"
                    }
                });
            }
        },

        users: async () => User.find({}),

        //me: async (_, args, Context) => {
        me: async (_, args, {userInfo}) => {
            if (userInfo) {
                return User.findById(userInfo.user_id)
            } else {
                throw new GraphQLError('Unauthorized Error', {
                    extensions: {
                        code: "401_UNAUTORIZED"
                    }
                });
            }
        }

    }

}