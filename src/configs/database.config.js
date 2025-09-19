import mongoose from "mongoose";

export const connect = async() =>{
    try {
        const connectDB = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connectd: ${connectDB.connection.host}`);
    } catch (error) {
     console.error('Error connection', error.message);   
    }
};