import GetAllCourses from "../api/getAllCourses";

import { getQueryClient } from "@/lib/getQueryClient";

const prefetchAllCourses = async (searchParams: SearchParamsType) => {
    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: ["courses", searchParams],
        queryFn: ({ pageParam }) => GetAllCourses({ searchParams, pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: { nextPage: number }) =>
            lastPage.nextPage ?? false,
    });

    return {
        queryClient,
    };
};

export default prefetchAllCourses;
