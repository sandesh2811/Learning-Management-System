import {
    CoursesSchema,
    type CourseType,
} from "@/features/allcourses/schemas/incomingCourseSchema";

import { HandleError } from "@/utils/errorHandling";

import { api } from "@/lib/axios";

type FeaturedCourses = Omit<
    ResponseStructure<CourseType[]>,
    "nextPage" | "error"
>;

export const getFeaturedCourses = async (): Promise<FeaturedCourses> => {
    try {
        const {
            data: { success, message, data },
        } = await api.get("/v1/course/getCourse/featuredCourse");

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
