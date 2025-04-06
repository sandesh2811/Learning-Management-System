import CoursesPage from "@/components/pages/courses/Courses";

const Courses = async ({ searchParams }: { searchParams: unknown }) => {
    const params = await searchParams;

    return <CoursesPage searchParams={params} />;
};

export default Courses;
