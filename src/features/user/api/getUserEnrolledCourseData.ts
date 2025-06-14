import { generateCookieHeader } from "@/utils/generateCookieHeader";
import {
    UserEnrolledCoursesDataSchema,
    type UserEnrolledCourseDataType,
} from "../schemas/getUserEnrolledCourseDataSchema";

import { HandleError } from "@/utils/errorHandling";

type GetUserEnrolledCoursesDataReturnType = {
    userEnrolledCoursesData: UserEnrolledCourseDataType[];
} & BaseResponse;

export const getUserEnrolledCoursesData = async (
    username: string
): Promise<GetUserEnrolledCoursesDataReturnType> => {
    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        /* Get the response from the backend */
        const response = await fetch(
            `http://localhost:3000/api/v1/course/getCourse/student`,
            {
                headers: {
                    Cookie: cookieHeader,
                },
                next: {
                    revalidate: 1200,
                    tags: [`purchased-courses/${username}`],
                },
            }
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
        const validData = await UserEnrolledCoursesDataSchema.parseAsync(data);

        return {
            success,
            message,
            userEnrolledCoursesData: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};
