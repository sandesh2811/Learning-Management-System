import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import EditCourseWrapper from "@/features/dashboard/editCourse/components/EditCourseWrapper";

const page = async ({ params }: ParamsProp<{ id: string }>) => {
    const { id } = await params;

    return (
        <ErrorBoundaryWrapper showButton={false}>
            <EditCourseWrapper id={id} />
        </ErrorBoundaryWrapper>
    );
};

export default page;
