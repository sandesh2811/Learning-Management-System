"use server";

import { HandleError } from "@/utils/errorHandling";
import { generateCookieHeader } from "@/utils/generateCookieHeader";

import { revalidateTag } from "next/cache";

type DeleteCourseArgs = {
    courseId: string;
    username: string;
};

export const deleteCourse = async ({
    courseId,
    username,
}: DeleteCourseArgs) => {
    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        /* Get the response from the backend */
        const response = await fetch(
            `http://localhost:3000/api/v1/course/deleteCourse/${courseId}`,
            {
                method: "DELETE",
                headers: {
                    Cookie: cookieHeader,
                },
            }
        );

        /* If response is not ok then throw error*/
        if (!response.ok) {
            const errorData = await response.json();

            const error = new Error(
                errorData.message || "Couldn't get user created courses!"
            );

            throw error;
        }

        /* Get JSON data from the obtained response and destructure it */
        const jsonData = await response.json();
        const { success, message } = jsonData;

        if (success) {
            revalidateTag(`dashboard/courses/${username}`);
        }

        return {
            success,
            message,
        };
    } catch (error) {
        return HandleError(error);
    }
};
