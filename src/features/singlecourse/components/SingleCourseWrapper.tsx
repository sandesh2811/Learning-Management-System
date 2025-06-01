import GetSingleCourse from "@/features/singlecourse/api/getSingleCourse";
import SingleCourse from "./SingleCourse";

type SingleCourseWrapperProps = { id: string };

const SingleCourseWrapper = async ({ id }: SingleCourseWrapperProps) => {
    const { success, message, course } = await GetSingleCourse(id);

    if (!(course || success))
        return <span className="font-light md:text-xl">{message}</span>;

    return (
        <div className="min-h-[60vh]">
            <SingleCourse course={course} />
        </div>
    );
};

export default SingleCourseWrapper;
