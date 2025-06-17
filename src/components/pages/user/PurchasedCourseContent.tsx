import { getSelectedCourseContent } from "@/features/user/api/getSelectedCourseContent";
import PurchasedCourseContent from "@/features/user/components/purchasedCourses/CourseContent/PurchasedCourseContent";

const PurchasedCourseContentPage = async ({
    courseId,
}: {
    courseId: string;
}) => {
    const { success, message, courseContent } =
        await getSelectedCourseContent(courseId);

    if (!courseContent || !success) {
        return <span className="font-light md:text-xl">{message}</span>;
    }

    return <PurchasedCourseContent courseContent={courseContent} />;
};

export default PurchasedCourseContentPage;
