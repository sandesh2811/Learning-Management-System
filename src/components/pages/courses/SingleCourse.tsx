import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import SingleCourseLoading from "@/features/singlecourse/components/SingleCourseLoading";
import SingleCourseWrapper from "@/features/singlecourse/components/SingleCourseWrapper";

import { Suspense } from "react";

const SingleCoursePage = ({ id }: { id: string }) => {
    return (
        <Suspense fallback={<SingleCourseLoading />}>
            <ErrorBoundaryWrapper showButton={true}>
                <SingleCourseWrapper id={id} />
            </ErrorBoundaryWrapper>
        </Suspense>
    );
};

export default SingleCoursePage;
