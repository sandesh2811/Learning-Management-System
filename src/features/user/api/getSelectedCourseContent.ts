import { HandleError } from "@/utils/errorHandling";
import { generateCookieHeader } from "@/utils/generateCookieHeader";
import { SelectedCourseContentSchema } from "../schemas/getSelectedCourseContentSchema";

export const getSelectedCourseContent = async (courseId: string) => {
    /* Get cookie header */
    const cookieHeader = await generateCookieHeader();

    try {
        /* Get the response from the backend */
        const response = await fetch(
            `http://localhost:3000/api/v1/course/courseContent?courseId=${courseId}`,
            {
                headers: {
                    Cookie: cookieHeader,
                },
                next: { revalidate: 1200, tags: [`profile/${courseId}`] },
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

        /* Validate the incoming data */
        const validData = await SelectedCourseContentSchema.parseAsync(data);

        return {
            success,
            message,
            courseContent: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};
