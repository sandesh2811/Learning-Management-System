import EditCoursePage from "@/features/dashboard/editCourse/components/EditCoursePage";

const page = async ({ params }: ParamsProp<{ id: string }>) => {
    const { id } = await params;

    console.log(id);

    return <EditCoursePage />;
};

export default page;
