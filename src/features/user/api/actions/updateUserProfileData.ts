"use server";

import { UpdateProfileType } from "../../schemas/updateProfileSchema";

import { generateCookieHeader } from "@/utils/generateCookieHeader";

import axios from "axios";

export const updateUserProfileData = async (
    _: unknown,
    data: UpdateProfileType
): Promise<BaseResponse> => {
    if (!data) {
        return {
            success: false,
            message: "Data to be updated is empty!",
        };
    }

    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        const formData = new FormData();

        /* Convert the incoming json data to form data */
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await axios.post(
            "http://localhost:3000/api/v1/user/profile/updateUserData",
            formData,
            {
                headers: {
                    Cookie: cookieHeader,
                },
            }
        );

        const { success, message } = response.data;

        return {
            success,
            message,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: error.response.data.success,
                message: error.response.data.message,
            };
        }

        return {
            success: false,
            message: "Internal Server Error!",
        };
    }
};
