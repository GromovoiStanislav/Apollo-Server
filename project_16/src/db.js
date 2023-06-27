import mongoose from "mongoose";
import {MONGODB_URI} from "./config.js";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export const getSesson = async ()=>{
  const db = await mongoose.createConnection(MONGODB_URI).asPromise();
  return db.startSession();
}