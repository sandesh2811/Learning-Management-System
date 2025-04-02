import GetAllCourses from "../api/getAllCourses";

import CourseCard from "./CourseCard";

const CoursesWrapper = async () => {
    const { success, message, courses } = await GetAllCourses();

    if (courses.length === 0)
        return (
            <span className="font-light md:text-xl">
                Looks like there are no courses available right now!
            </span>
        );

    return (
        <section className="flex flex-wrap gap-8">
            {courses.map((course) => (
                <CourseCard course={course} key={course._id} />
            ))}
        </section>
    );
};

export default CoursesWrapper;
