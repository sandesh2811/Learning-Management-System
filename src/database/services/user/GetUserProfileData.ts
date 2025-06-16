import "server-only";

import { UserModel } from "@/database/models/UserModel";

export const GetUserProfileData = async (
    userId: string
): Promise<UserType | null> => {
    const user = await UserModel.findById(userId)
        .select("-password -createdAt -__v")
        .lean<UserType>();

    if (!user) {
        return null;
    }

    return user;
};
