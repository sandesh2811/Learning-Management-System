import { getFeaturedCourses } from "../api/getFeaturedCourses";

import CourseCard from "@/components/shared/course/CourseCard";

const FeaturedCoursesCardsWrapper = async () => {
    /* Get featured courses */
    const {
        success,
        message,
        data: featuredCourses,
    } = await getFeaturedCourses();

    if (featuredCourses?.length === 0 && !success)
        return (
            <span className="font-light md:text-xl">
                {message}
                {/* Looks like there are no featured course available right now! */}
            </span>
        );

    return (
        <div
            data-testid="featured-courses-wrapper"
            className="flex flex-wrap justify-center gap-6 md:grid md:grid-cols-2 md:justify-start lg:grid-cols-3 xl:gap-9"
        >
            {featuredCourses?.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    );
};

export default FeaturedCoursesCardsWrapper;
