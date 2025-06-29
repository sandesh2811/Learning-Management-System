import { getCourseToUpdate } from "../api/getCourseToUpdate";

import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetCourseToUpdate = (id: string) => {
    const {
        data: { courseToUpdate },
    } = useSuspenseQuery({
        queryKey: ["courseToUpdate", id],
        queryFn: () => getCourseToUpdate(id),
    });

    return {
        courseToUpdate,
    };
};
