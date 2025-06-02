import { HandleError } from "@/utils/errorHandling";

import {
    RelatedCoursesSchema,
    SingleCourseSchema,
    type RelatedCoursesType,
    type SingleCourseType,
} from "../schemas/singleCourse";

interface GetSingleCourseReturnType extends BaseResponse {
    singleCourse?: {
        course: SingleCourseType;
        relatedCourses: RelatedCoursesType;
    };
}

const GetSingleCourse = async (
    id: string
): Promise<GetSingleCourseReturnType> => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/v1/course/getCourse/${id}`,
            {
                next: {
                    tags: [`course-${id}`],
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

        const course = await SingleCourseSchema.parseAsync(data.course);
        const relatedCourses = await RelatedCoursesSchema.parseAsync(
            data.relatedCourses
        );

        const validData = {
            course,
            relatedCourses,
        };

        return {
            success,
            message,
            singleCourse: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};

export default GetSingleCourse;
