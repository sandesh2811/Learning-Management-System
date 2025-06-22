import {
    RelatedCoursesType,
    type SingleCourseType,
} from "../schemas/singleCourse";

import ReasonsToBuyTheCourse from "./ReasonsToBuy/ReasonsToBuy";
import CourseContentContainer from "./CourseContent";
import BasicCourseDetails from "./BasicCourseDetails";
import CourseInstructorInfo from "./CourseInstructorInfo";

type SingleCourseProps = {
    singleCourse: {
        course: SingleCourseType;
        relatedCourses: RelatedCoursesType;
    };
};

const SingleCourse = ({ singleCourse }: SingleCourseProps) => {
    const { course, relatedCourses } = singleCourse;

    const {
        instructorInfo,
        courseContent,
        enrolledStudents,
        languagesAvailable,
    } = course;

    /* For cart items */
    const infoToBeSetInCart = {
        id: course._id,
        title: course.title,
        price: course.price,
        duration: course.duration,
        instructorName: course.instructorInfo.fullname,
    };

    return (
        <div className="flex min-h-[50vh] w-full flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <BasicCourseDetails course={course} />
                <ReasonsToBuyTheCourse
                    studentsEnrolled={enrolledStudents}
                    languagesAvailable={languagesAvailable}
                    cartItemInfo={infoToBeSetInCart}
                />
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
                <CourseContentContainer courseContent={courseContent} />
                <CourseInstructorInfo
                    courseInstructorInfo={instructorInfo}
                    relatedCourses={relatedCourses}
                />
            </div>
        </div>
    );
};

export default SingleCourse;
