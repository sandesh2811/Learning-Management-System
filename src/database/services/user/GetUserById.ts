import "server-only";

import { UserModel, UserSchemaType } from "@/database/models/UserModel";
import mongoose from "mongoose";

export const getUserById = async (
    userId: string
): Promise<UserSchemaType | null> => {
    // Convert incoming string to valid mongodb id
    const id = new mongoose.Types.ObjectId(userId);

    const user = await UserModel.findById(id).select("-password -createdAt");

    if (!user) {
        return null;
    }

    return user;
};
