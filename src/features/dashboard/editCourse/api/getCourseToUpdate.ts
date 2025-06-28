import {
    CourseToUpdateSchema,
    type CourseToUpdate,
} from "../schemas/courseToUpdateSchema";

import { api } from "@/lib/axios";
import { HandleError } from "@/utils/errorHandling";

type GetCourseToUpdateReturnType = {
    courseToUpdate: CourseToUpdate;
} & BaseResponse;

export const getCourseToUpdate = async (
    id: string
): Promise<GetCourseToUpdateReturnType> => {
    try {
        /* Get the response from the backend */
        const {
            data: { success, message, data },
        } = await api.get(`v1/dashboard/editCourse/getSingleCourse/${id}`);

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
