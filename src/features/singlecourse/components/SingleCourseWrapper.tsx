import GetSingleCourse from "@/features/singlecourse/api/getSingleCourse";

import SingleCourse from "./SingleCourse";
import SingleCourseDetailsDispatcher from "./SingleCourseDetailsDispatcher";

type SingleCourseWrapperProps = { id: string };

const SingleCourseWrapper = async ({ id }: SingleCourseWrapperProps) => {
    const { success, message, singleCourse } = await GetSingleCourse(id);

    if (!singleCourse || !success) {
        return <span className="font-light md:text-xl">{message}</span>;
    }

    return (
        <div className="min-h-[60vh]">
            <SingleCourse singleCourse={singleCourse} />

            {/* Only for dispatching the course details from redux. No any JSX*/}
            <SingleCourseDetailsDispatcher singleCourse={singleCourse.course} />
        </div>
    );
};

export default SingleCourseWrapper;
