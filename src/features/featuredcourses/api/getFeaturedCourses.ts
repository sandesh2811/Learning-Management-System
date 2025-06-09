import {
    CoursesSchema,
    type CourseType,
} from "@/features/allcourses/schemas/incomingCourseSchema";

import { HandleError } from "@/utils/errorHandling";

type FeaturedCourses = Omit<
    ResponseStructure<CourseType[]>,
    "nextPage" | "error"
>;

export const getFeaturedCourses = async (): Promise<FeaturedCourses> => {
    try {
        const response = await fetch(
            `http://localhost:3000/api//v1/course/getCourse/featuredCourse`,
            {
                next: {
                    revalidate: 3600,
                    tags: [`featured-courses`],
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();

            const error = new Error(
                errorData.message || "Couldn't get course!"
            );

            throw error;
        }

        const jsonData = await response.json();

        const { success, message, data } = jsonData;

        const validData = await CoursesSchema.parseAsync(data);

        return {
            success,
            message,
            data: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};
