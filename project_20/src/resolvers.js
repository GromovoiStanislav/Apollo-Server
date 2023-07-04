import Car from './models/Car.js';

export default {
    Query: {
        allCars: async (parent, args, context) => {
            return Car.find();
        },
        myToken: async (parent, args, {token}) => {
            return token;
        },
    },
    Mutation: {
        createCar: async (parent, args, context) => {
            return new Car(args).save();
        }
    }
}
