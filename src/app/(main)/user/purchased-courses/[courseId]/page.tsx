import PurchasedCourseContentPage from "@/components/pages/user/PurchasedCourseContent";

const PurchasedCourseContent = async ({
    params,
}: ParamsProp<{ courseId: string }>) => {
    const { courseId } = await params;

    return <PurchasedCourseContentPage courseId={courseId} />;
};

export default PurchasedCourseContent;
