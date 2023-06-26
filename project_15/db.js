import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test");
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};


