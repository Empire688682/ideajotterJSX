import mongoose from 'mongoose';
import dontenv from 'dotenv';

dontenv.config();

export const dbConnection = async () =>{
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}