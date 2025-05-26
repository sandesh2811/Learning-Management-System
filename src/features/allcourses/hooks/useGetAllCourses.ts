import GetAllCourses from "../api/getAllCourses";

import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllCourses = (searchParams: SearchParamsType) => {
    const {
        data,
        error,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["courses", searchParams],
        queryFn: ({ pageParam }) => GetAllCourses({ searchParams, pageParam }),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    });
    const courses = data?.pages.flatMap((page) => page.courses || []);

    const message = data?.pages[0].message;
    const success = data?.pages[0].success;
    const nextPage = data?.pages[0].nextPage;

    return {
        courses,
        message,
        success,
        nextPage,
        error,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};
