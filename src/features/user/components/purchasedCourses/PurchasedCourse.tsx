import { getUserEnrolledCoursesData } from "../../api/getUserEnrolledCourseData";

import CourseListCard from "./CourseListCard";
import CourseListTable from "./CourseListTable";

interface PurchasedCourseProps {
    username: string;
}

const PurchasedCoursePage = async ({ username }: PurchasedCourseProps) => {
    const { success, message, userEnrolledCoursesData } =
        await getUserEnrolledCoursesData(username);

    if (userEnrolledCoursesData?.length === 0 && !success)
        return <span className="font-light md:text-xl">{message}</span>;

    return (
        <>
            {/* PURCHASED COURSE FOR LAPTOP */}
            <CourseListTable
                userEnrolledCoursesData={userEnrolledCoursesData}
            />

            {/* PURCHASED COURSE FOR MOBILE */}
            <CourseListCard userEnrolledCoursesData={userEnrolledCoursesData} />
        </>
    );
};

export default PurchasedCoursePage;
