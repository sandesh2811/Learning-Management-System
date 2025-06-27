"use server";

import { BasicInfoUpdateType } from "../schemas/basicInfoUpdateScehma";

import { generateCookieHeader } from "@/utils/generateCookieHeader";

export const updateBasicInfo = async (
    courseId: string,
    data: Partial<BasicInfoUpdateType>
) => {
    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        /* Get the response from the backend */
        const response = await fetch(
            `http://localhost:3000/api/v1/dashboard/editCourse/updateBasicInfo/${courseId}`,
            {
                body: JSON.stringify(data),
                method: "PATCH",
                headers: {
                    Cookie: cookieHeader,
                },
            }
        );

        /* If response is not ok then throw error*/
        if (!response.ok) {
            const errorData = await response.json();

            const error = new Error(
                errorData.message || "Couldn't update basic info of course!"
            );

            throw error;
        }

        /* Get JSON data from the obtained response and destructure it */
        const jsonData = await response.json();
        const { success, message } = jsonData;

        return {
            success,
            message,
        };
    } catch (error) {
        if (error instanceof Error)
            return {
                success: false,
                message: error.message,
            };

        return {
            success: false,
            message: "Internal server error!",
        };
    }
};
