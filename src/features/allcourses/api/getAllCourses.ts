import { CoursesSchema } from "../schemas/incomingCourseSchema";

import { HandleError } from "@/utils/errorHandling";

import { api } from "@/lib/axios";

interface GetAllCoursesProps {
    searchParams?: unknown;
    pageParam?: {
        id: string;
        price: string;
    };
}

const GetAllCourses = async ({
    searchParams,
    pageParam,
}: GetAllCoursesProps) => {
    const { search, type, price, duration, language } =
        searchParams as SearchParamsType;

    try {
        const {
            data: { success, message, data, nextPage },
        } = await api.get("/v1/course/getCourse", {
            params: {
                search,
                type,
                price,
                duration,
                language,
                pageCursor: pageParam?.id,
                priceCursor: pageParam?.price,
            },
        });

        const validData = await CoursesSchema.parseAsync(data);

        return {
            success,
            message,
            courses: validData,
            nextPage,
        };
    } catch (error) {
        return HandleError(error);
    }
};

export default GetAllCourses;
