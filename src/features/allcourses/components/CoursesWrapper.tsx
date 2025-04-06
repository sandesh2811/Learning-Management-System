import GetAllCourses from "../api/getAllCourses";

import CourseCard from "./CourseCard";

const CoursesWrapper = async ({ searchParams }: { searchParams: unknown }) => {
    const { success, message, courses } = await GetAllCourses(searchParams);

    if (courses.length === 0)
        return (
            <span className="font-light md:text-xl">
                Looks like there are no courses available right now!
            </span>
        );

    return (
        <section className="flex grid-cols-2 flex-wrap items-center justify-center gap-8 md:grid lg:grid-cols-3">
            {courses.map((course) => (
                <CourseCard course={course} key={course._id} />
            ))}
        </section>
    );
};

export default CoursesWrapper;
