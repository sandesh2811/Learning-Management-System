import {
    UserCreatedCoursesSchema,
    type UserCreatedCoursesType,
} from "../schemas/userCreatedCoursesSchema";

import { api } from "@/lib/axios";
import { HandleError } from "@/utils/errorHandling";

type GetCoursesCreatedByUserReturnType = {
    userCreatedCourses: UserCreatedCoursesType;
} & BaseResponse;

export const getCoursesCreatedByUser =
    async (): Promise<GetCoursesCreatedByUserReturnType> => {
        try {
            /* Get the user created course data */
            const {
                data: { success, message, data },
            } = await api.get("v1/course/getCourse/author");

            /* Validate the incoming data from the backend */
            const validData = await UserCreatedCoursesSchema.parseAsync(data);

            return {
                success,
                message,
                userCreatedCourses: validData,
            };
        } catch (error) {
            return HandleError(error);
        }
    };
