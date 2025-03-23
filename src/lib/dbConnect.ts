import { env } from "@/utils/checkEnv";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
