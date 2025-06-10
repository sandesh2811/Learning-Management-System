import "server-only";

import { UserModel } from "@/database/models/UserModel";

import { ChangedDataType } from "@/app/api/v1/user/profile/updateUserData/route";

type UpdateUserProfileData = {
    userId: string;
    changedData: ChangedDataType;
};

export const updateUserProfileData = async ({
    userId,
    changedData,
}: UpdateUserProfileData): Promise<boolean> => {
    const updatedData = await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $set: changedData },
        { new: true }
    );

    if (!updatedData) {
        return false;
    }

    return true;
};
