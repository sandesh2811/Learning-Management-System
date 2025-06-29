import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import EditCourseLoading from "@/features/dashboard/editCourse/components/EditCourseLoading";
import EditCourseWrapper from "@/features/dashboard/editCourse/components/EditCourseWrapper";

import { Suspense } from "react";

const page = async ({ params }: ParamsProp<{ id: string }>) => {
    const { id } = await params;

    return (
        <Suspense fallback={<EditCourseLoading />}>
            <ErrorBoundaryWrapper showButton={false}>
                <EditCourseWrapper id={id} />
            </ErrorBoundaryWrapper>
        </Suspense>
    );
};

export default page;
