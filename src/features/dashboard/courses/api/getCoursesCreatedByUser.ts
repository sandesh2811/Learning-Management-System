import {
    UserCreatedCoursesSchema,
    type UserCreatedCoursesType,
} from "../schemas/userCreatedCoursesSchema";

import { HandleError } from "@/utils/errorHandling";
import { generateCookieHeader } from "@/utils/generateCookieHeader";

type GetCoursesCreatedByUserReturnType = {
    userCreatedCourses: UserCreatedCoursesType;
} & BaseResponse;

export const getCoursesCreatedByUser = async (
    username: string
): Promise<GetCoursesCreatedByUserReturnType> => {
    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        /* Get the response from the backend */
        const response = await fetch(
            `http://localhost:3000/api/v1/course/getCourse/author`,
            {
                headers: {
                    Cookie: cookieHeader,
                },
                next: {
                    revalidate: 300,
                    tags: [`dashboard/courses/${username}`],
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
        const { success, message, data } = jsonData;

        /* Validate the incoming data from the backend */
        const validData = await UserCreatedCoursesSchema.parseAsync(data);

        return {
            success,
            message,
            userCreatedCourses: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};
