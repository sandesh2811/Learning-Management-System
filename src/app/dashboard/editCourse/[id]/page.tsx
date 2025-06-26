import EditCoursePage from "@/components/pages/dashboard/editCourse/EditCoursePage";

const page = async ({ params }: ParamsProp<{ id: string }>) => {
    const { id } = await params;

    return <EditCoursePage id={id} />;
};

export default page;
