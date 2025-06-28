import { getCourseToUpdate } from "../api/getCourseToUpdate";

import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetCourseToUpdate = (id: string) => {
    const {
        data: { success, message, courseToUpdate },
        isLoading,
    } = useSuspenseQuery({
        queryKey: ["courseToUpdate", id],
        queryFn: () => getCourseToUpdate(id),
    });

    return {
        success,
        message,
        isLoading,
        courseToUpdate,
    };
};
