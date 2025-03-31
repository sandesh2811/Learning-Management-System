import GetAllCourses from "@/features/allcourses/api/getAllCourses";
import FeaturedCourseCard from "./FeaturedCourseCard";

const FeaturedCoursesCardsWrapper = async () => {
    /* Get all courses */
    const { success, message, courses } = await GetAllCourses();

    const featuredcourses = courses.filter(
        (course) => course.rating >= 4.5 && course
    );

    if (featuredcourses.length === 0)
        return (
            <span className="font-light md:text-xl">
                Looks like there are no featured course available right now!
            </span>
        );

    return (
        <div className="flex flex-wrap justify-center gap-6 md:grid md:grid-cols-2 md:justify-start lg:grid-cols-3 xl:gap-9">
            {featuredcourses.map((course) => (
                <FeaturedCourseCard key={course._id} course={course} />
            ))}
        </div>
    );
};

export default FeaturedCoursesCardsWrapper;
