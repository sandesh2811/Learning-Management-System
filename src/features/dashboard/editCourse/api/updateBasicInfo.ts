"use server";

import { BasicInfoUpdateType } from "../schemas/basicInfoUpdateScehma";

import axios from "axios";

import { generateCookieHeader } from "@/utils/generateCookieHeader";

export const updateBasicInfo = async (
    courseId: string,
    data: Partial<BasicInfoUpdateType>
): Promise<BaseResponse> => {
    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        /* Update the course data */
        const {
            data: { success, message },
        } = await axios.patch(
            `http://localhost:3000/api/v1/dashboard/editCourse/updateBasicInfo/${courseId}`,
            data,
            {
                headers: {
                    Cookie: cookieHeader,
                },
            }
        );

        return {
            success,
            message,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response)
            return {
                success: error.response.data.success,
                message: error.response.data.message,
            };

        return {
            success: false,
            message: "Internal server error!",
        };
    }
};
