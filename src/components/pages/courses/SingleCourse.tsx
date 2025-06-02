import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import SingleCourseLoading from "@/features/singlecourse/components/SingleCourseLoading";
import SingleCourseWrapper from "@/features/singlecourse/components/SingleCourseWrapper";

import { Suspense } from "react";

const SingleCoursePage = ({ id }: { id: string }) => {
    return (
        <ErrorBoundaryWrapper showButton={true}>
            <Suspense fallback={<SingleCourseLoading />}>
                <SingleCourseWrapper id={id} />
            </Suspense>
        </ErrorBoundaryWrapper>
    );
};

export default SingleCoursePage;
