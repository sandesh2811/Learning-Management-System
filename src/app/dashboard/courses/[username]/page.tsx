import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import CreatedCourseHeader from "@/features/dashboard/courses/components/CreatedCoursesHeader";
import CreatedCoursesLoading from "@/features/dashboard/courses/components/CreatedCoursesLoading";
import CreatedCoursesWrapper from "@/features/dashboard/courses/components/CreatedCoursesWrapper";

import { Suspense } from "react";

const page = async ({ params }: ParamsProp<{ username: string }>) => {
    const { username } = await params;

    return (
        <div className="flex flex-col gap-8">
            <CreatedCourseHeader />
            <Suspense fallback={<CreatedCoursesLoading />}>
                <ErrorBoundaryWrapper showButton={false}>
                    <CreatedCoursesWrapper username={username} />
                </ErrorBoundaryWrapper>
            </Suspense>
        </div>
    );
};

export default page;
