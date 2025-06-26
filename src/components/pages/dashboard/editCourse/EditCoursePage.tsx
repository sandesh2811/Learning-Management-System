import { getCourseToUpdate } from "@/features/dashboard/editCourse/api/getCourseToUpdate";
import EditCourseWrapper from "../../../../features/dashboard/editCourse/components/EditCourseWrapper";

const EditCoursePage = async ({ id }: { id: string }) => {
    const { success, message, courseToUpdate } = await getCourseToUpdate(id);

    if (!success)
        return <span className="font-light md:text-xl">{message}</span>;

    return <EditCourseWrapper courseToUpdate={courseToUpdate} />;
};

export default EditCoursePage;
