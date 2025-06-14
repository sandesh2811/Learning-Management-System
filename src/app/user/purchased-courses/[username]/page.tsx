import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import PurchasedCoursePage from "@/features/user/components/purchasedCourses/PurchasedCourse";
import PurchasedCourseLoading from "@/features/user/components/purchasedCourses/PurchasedCourseLoading";

import { Suspense } from "react";

const PurchasedCourses = async ({
    params,
}: ParamsProp<{ username: string }>) => {
    const { username } = await params;

    return (
        <div className="mid:px-4 flex min-h-[56vh] flex-col gap-4 overflow-hidden overflow-y-auto">
            <h2 className="text-2xl font-semibold">Your purchased courses</h2>
            <Suspense fallback={<PurchasedCourseLoading />}>
                <ErrorBoundaryWrapper showButton={true}>
                    <PurchasedCoursePage username={username} />
                </ErrorBoundaryWrapper>
            </Suspense>
        </div>
    );
};

export default PurchasedCourses;
