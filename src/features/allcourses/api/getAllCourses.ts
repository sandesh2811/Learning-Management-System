import { CoursesSchema } from "../schemas/incomingCourseSchema";

import { api } from "@/lib/axios";
import { HandleError } from "@/utils/errorHandling";

import { cache } from "react";

const GetAllCourses = cache(async () => {
    try {
        const {
            data: { success, message, data },
        } = await api.get("/v1/course/getCourse");

        const validData = await CoursesSchema.parseAsync(data);

        return {
            success,
            message,
            courses: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
});

export default GetAllCourses;
