import "server-only";

import { UserModel } from "@/database/models/UserModel";

export const GetUserProfileData = async (
    username: string
): Promise<UserType | null> => {
    const user = await UserModel.findOne({ username })
        .select("-password -createdAt -__v")
        .lean<UserType>();

    if (!user) {
        return null;
    }

    return user;
};
