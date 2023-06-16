import Message from '../../models/Message.js'
import mongoose from 'mongoose'

export const messagesResolvers = {
    Mutation: {
        async createMessage(_, {messageInput: {text, username}}) {
            const newMessage = new Message({
                text: text,
                createdBy: username,
                createdAt: new Date().toISOString()
            });
            const res = await newMessage.save();
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        message: async (_, {id}) => {
            if (mongoose.Types.ObjectId.isValid(id)) {
                console.log(id, 'Valid');
                return Message.findById(id)
            } else {
                console.log(id, 'not Valid');
                return null
            }

        },
        messages: async () => Message.find({})
    }
}