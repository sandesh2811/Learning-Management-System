import { UserEnrolledCourseDataType } from "../../schemas/getUserEnrolledCourseDataSchema";

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

interface CourseListCardProps {
    userEnrolledCoursesData: UserEnrolledCourseDataType[];
}

const CourseListCard = ({ userEnrolledCoursesData }: CourseListCardProps) => {
    return (
        <div className="divide-primary-text/20 flex flex-col gap-4 divide-y-[1.2px] overflow-y-auto md:hidden">
            {userEnrolledCoursesData.map((userEnrolledCourse) => (
                <Link
                    key={userEnrolledCourse.course._id}
                    href={`purchased-courses/${userEnrolledCourse.course._id}`}
                >
                    <div className="group hover:bg-accent/70 focus:bg-accent/70 flex cursor-pointer items-center justify-between py-2 transition-colors focus:outline-none">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-medium">
                                {userEnrolledCourse.course.title}
                            </h3>
                            <span>
                                {new Date(
                                    userEnrolledCourse.createdAt
                                ).toDateString()}
                            </span>
                            <span>20% completed</span>
                        </div>
                        <span className="flex items-center gap-2 pr-3">
                            View
                            <span className="duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2 group-focus:translate-x-2 group-focus:-translate-y-2">
                                <GoArrowUpRight size={20} />
                            </span>
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CourseListCard;
