import { env } from "@/utils/checkEnv";
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

export const connectDB = async (): Promise<void> => {
    if (connection.isConnected) {
        return;
    }

    try {
        const dbConnection = await mongoose.connect(env.MONGODB_URI);

        connection.isConnected = dbConnection.connections[0].readyState;

        console.log("Database Connected Successfully!");
    } catch (error) {
        console.log("Database connection failed!", error);
        process.exit(1);
    }
};
