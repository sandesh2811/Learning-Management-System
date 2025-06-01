import { api } from "@/lib/axios";
import { HandleError } from "@/utils/errorHandling";

import { SingleCourseSchema } from "../schemas/singleCourse";

const GetSingleCourse = async (id: string) => {
    try {
        const {
            data: { success, message, data },
        } = await api.get(`/v1/course/getCourse/${id}`);

        const validData = await SingleCourseSchema.parseAsync(data);

        return {
            success,
            message,
            course: validData,
        };
    } catch (error) {
        return HandleError(error);
    }
};

export default GetSingleCourse;
