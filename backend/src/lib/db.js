import mongoose from "mongoose"; 

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB Connected", conn.connection.host); 
    } catch (error) {
        console.error("Error connection to MongoDB", error); 
        process.exit(1) // status code 1 for error and 0 for success
    }
}