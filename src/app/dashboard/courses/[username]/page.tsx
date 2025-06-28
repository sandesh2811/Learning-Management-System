import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import CreatedCourses from "@/features/dashboard/courses/components/CreatedCourses";
import CreatedCourseHeader from "@/features/dashboard/courses/components/CreatedCoursesHeader";
import CreatedCoursesLoading from "@/features/dashboard/courses/components/CreatedCoursesLoading";

import { Suspense } from "react";

const page = async ({ params }: ParamsProp<{ username: string }>) => {
    const { username } = await params;

    return (
        <div className="flex flex-col gap-8">
            <CreatedCourseHeader username={username} />
            <Suspense fallback={<CreatedCoursesLoading />}>
                <ErrorBoundaryWrapper showButton={false}>
                    <CreatedCourses username={username} />
                </ErrorBoundaryWrapper>
            </Suspense>
        </div>
    );
};

export default page;
