import { getCoursesCreatedByUser } from "../api/getCoursesCreatedByUser";
import CreatedCourses from "./CreatedCourses";

interface CreatedCoursesWrapperProps {
    username: string;
}

const CreatedCoursesWrapper = async ({
    username,
}: CreatedCoursesWrapperProps) => {
    const { success, message, userCreatedCourses } =
        await getCoursesCreatedByUser(username);

    if (userCreatedCourses?.length === 0 && !success)
        return <span className="font-light md:text-xl">{message}</span>;

    return <CreatedCourses userCreatedCourses={userCreatedCourses} />;
};

export default CreatedCoursesWrapper;
