import SingleCoursePage from "@/components/pages/courses/SingleCourse";

const SingleCourse = async ({ params }: ParamsProp<{ id: string }>) => {
    const { id } = await params;

    return <SingleCoursePage id={id} />;
};

export default SingleCourse;
