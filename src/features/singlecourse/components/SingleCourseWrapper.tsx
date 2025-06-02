import GetSingleCourse from "@/features/singlecourse/api/getSingleCourse";

import SingleCourse from "./SingleCourse";

type SingleCourseWrapperProps = { id: string };

const SingleCourseWrapper = async ({ id }: SingleCourseWrapperProps) => {
    const { success, message, singleCourse } = await GetSingleCourse(id);

    if (!singleCourse || !success) {
        return <span className="font-light md:text-xl">{message}</span>;
    }

    return (
        <div className="min-h-[60vh]">
            <SingleCourse singleCourse={singleCourse} />
        </div>
    );
};

export default SingleCourseWrapper;
