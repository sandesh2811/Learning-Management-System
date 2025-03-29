import FeaturedCourseCard from "./FeaturedCourseCard";

const FeaturedCoursesCardsWrapper = async () => {
    return (
        <div className="md flex flex-wrap justify-center gap-6 md:grid md:grid-cols-2 md:justify-start lg:grid-cols-3 xl:gap-9">
            {Array.from({ length: 4 }).map((_, idx) => (
                <FeaturedCourseCard key={idx} data="" />
            ))}
        </div>
    );
};

export default FeaturedCoursesCardsWrapper;
