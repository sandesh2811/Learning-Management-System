import prefetchAllCourses from "@/features/allcourses/utils/prefetchAllCourses";

import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import CoursesWrapper from "@/features/allcourses/components/CoursesWrapper";
import FiltersWrapper from "@/features/allcourses/components/Filters/FiltersWrapper";
import PaginationButton from "@/features/allcourses/components/Pagination/PaginationButton";
import UserTypingContextProvider from "@/components/shared/course/UserTypingContextProvider";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface CoursesPageProps {
    searchParams: SearchParamsType;
}

const CoursesPage = async ({ searchParams }: CoursesPageProps) => {
    const { queryClient } = await prefetchAllCourses(searchParams);

    return (
        <div className="flex min-h-[80vh] flex-col gap-10 rounded-2xl">
            <UserTypingContextProvider>
                {/* Filters */}
                <Suspense>
                    <FiltersWrapper searchParams={searchParams} />

                    <HydrationBoundary state={dehydrate(queryClient)}>
                        {/* Courses */}

                        <ErrorBoundaryWrapper
                            subErrorMessage="Please try clearing filters if applied or try again later!"
                            showButton={true}
                        >
                            <CoursesWrapper searchParams={searchParams} />
                        </ErrorBoundaryWrapper>

                        {/* Pagination Button */}
                        <PaginationButton searchParams={searchParams} />
                    </HydrationBoundary>
                </Suspense>
            </UserTypingContextProvider>
        </div>
    );
};

export default CoursesPage;
