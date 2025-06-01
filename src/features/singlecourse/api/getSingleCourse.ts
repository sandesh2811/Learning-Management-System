import { api } from "@/lib/axios";
import { HandleError } from "@/utils/errorHandling";

import {
    RelatedCoursesSchema,
    SingleCourseSchema,
} from "../schemas/singleCourse";

const GetSingleCourse = async (id: string) => {
    try {
        const {
            data: { success, message, data },
        } = await api.get(`/v1/course/getCourse/${id}`);

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
