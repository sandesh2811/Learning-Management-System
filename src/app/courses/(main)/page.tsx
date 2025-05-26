import CoursesPage from "@/components/pages/courses/Courses";

const Courses = async ({ searchParams }: PageProps) => {
    const params = await searchParams;

    return <CoursesPage searchParams={params} />;
};

export default Courses;
