import { CoursesSchema } from "../schemas/incomingCourseSchema";

import { api } from "@/lib/axios";
import { HandleError } from "@/utils/errorHandling";

import { cache } from "react";

const GetAllCourses = cache(async () => {
    // const { search, type, price, durartion, language } = searchParams;

    try {
        const {
            data: { success, message, data },
        } = await api.get("/v1/course/getCourse", {
            // params: {
            //     search,
            //     type,
            //     price,
            //     durartion,
            //     language,
            // },
        });

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
