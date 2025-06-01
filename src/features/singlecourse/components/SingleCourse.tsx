import { type SingleCourseType } from "../schemas/singleCourse";

import ReasonsToBuyTheCourse from "./ReasonsToBuy";
import CourseContentContainer from "./CourseContent";
import BasicCourseDetails from "./BasicCourseDetails";
import CourseInstructorInfo from "./CourseInstructorInfo";

type SingleCourseProps = {
    course: SingleCourseType;
};

const SingleCourse = ({ course }: SingleCourseProps) => {
    return (
        <div className="flex min-h-[50vh] w-full flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <BasicCourseDetails course={course} />
                <ReasonsToBuyTheCourse
                    studentsEnrolled={course.enrolledStudents}
                />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
                <CourseContentContainer />
                <CourseInstructorInfo />
            </div>
        </div>
    );
};

export default SingleCourse;
