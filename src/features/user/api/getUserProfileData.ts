import {
    UserProfileDataSchema,
    type UserProfileDataType,
} from "../schemas/getUserProfileDataSchema";

import { HandleError } from "@/utils/errorHandling";

type GetUserProfileDataReturnType = {
    userProfileData: UserProfileDataType;
} & BaseResponse;

export const getUserProfileData = async (
    username: string
): Promise<GetUserProfileDataReturnType> => {
    try {
        /* Get the response from the backend */
        const response = await fetch(
            `http://localhost:3000/api/v1/user/profile/getUserData?username=${username}`,
            { next: { revalidate: 3600, tags: [`profile/${username}`] } }
        );

        /* If response is not ok then throw error*/
        if (!response.ok) {
            const errorData = await response.json();

            const error = new Error(
                errorData.message || "Couldn't get course!"
            );

            throw error;
        }

        /* Get JSON data from the obtained response and destructure it */
        const jsonData = await response.json();
        const { success, message, data } = jsonData;

        /* Validate the incoming data from the backend */
        const validData = await UserProfileDataSchema.parseAsync(data);

        return {
            success,
            message,
            userProfileData: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};
