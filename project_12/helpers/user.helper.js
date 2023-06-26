import UserModel from '../models/user.model.js';

const userHelper = {
    isEmailAlreadyExist: async (email) => {
        const user = await UserModel.findOne({email: email});
        return !!user;
    },
};

export default userHelper;
