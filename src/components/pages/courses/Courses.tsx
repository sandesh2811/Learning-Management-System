import CoursesLoading from "@/components/shared/CoursesLoading";
import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import CoursesWrapper from "@/features/allcourses/components/CoursesWrapper";
import FiltersWrapper from "@/features/allcourses/components/Filters/FiltersWrapper";

import { Suspense } from "react";

const CoursesPage = ({ searchParams }: { searchParams: unknown }) => {
    return (
        <div className="flex min-h-[80vh] flex-col gap-8 rounded-2xl p-3 md:p-6">
            {/* Filters */}
            <FiltersWrapper searchParams={searchParams} />

            {/* Courses */}
            <ErrorBoundaryWrapper>
                <Suspense fallback={<CoursesLoading length={6} />}>
                    <CoursesWrapper searchParams={searchParams} />
                </Suspense>
            </ErrorBoundaryWrapper>
        </div>
    );
};

export default CoursesPage;
