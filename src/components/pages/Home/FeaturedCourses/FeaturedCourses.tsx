import FeaturedCoursesCardsWrapper from "@/features/featuredcourses/components/FeaturedCoursesWrapper";
import Heading from "@/features/featuredcourses/components/Heading";

const FeaturedCourses = () => {
    return (
        <section className="flex flex-col gap-4">
            {/* Heading */}
            <Heading />

            {/* Featured courses */}
            <FeaturedCoursesCardsWrapper />
        </section>
    );
};

export default FeaturedCourses;
