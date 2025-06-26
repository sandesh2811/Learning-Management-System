import {
    CourseToUpdateSchema,
    type CourseToUpdate,
} from "../schemas/courseToUpdateSchema";

import { HandleError } from "@/utils/errorHandling";
import { generateCookieHeader } from "@/utils/generateCookieHeader";

type GetCourseToUpdateReturnType = {
    courseToUpdate: CourseToUpdate;
} & BaseResponse;

export const getCourseToUpdate = async (
    id: string
): Promise<GetCourseToUpdateReturnType> => {
    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        /* Get the response from the backend */
        const response = await fetch(
            `http://localhost:3000/api/v1/dashboard/editCourse/getSingleCourse/${id}`,
            {
                headers: {
                    Cookie: cookieHeader,
                },
                next: {
                    revalidate: 300,
                    tags: [`dashboard/editCourse/${id}`],
                },
            }
        );

        /* If response is not ok then throw error*/
        if (!response.ok) {
            const errorData = await response.json();

            const error = new Error(
                errorData.message || "Couldn't delete particular course!"
            );

            throw error;
        }

        /* Get JSON data from the obtained response and destructure it */
        const jsonData = await response.json();
        const { success, message, data } = jsonData;

        /* Validate the incoming data from the backend */
        const validData = await CourseToUpdateSchema.parseAsync(data);

        return {
            success,
            message,
            courseToUpdate: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};
