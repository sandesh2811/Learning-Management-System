import { getCoursesCreatedByUser } from "../api/getCoursesCreatedByUser";

import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetCoursesCreatedByUser = (username: string) => {
    const {
        data: { userCreatedCourses },
    } = useSuspenseQuery({
        queryKey: ["userCreatedCourses", username],
        queryFn: () => getCoursesCreatedByUser(),
    });

    return {
        userCreatedCourses,
    };
};
