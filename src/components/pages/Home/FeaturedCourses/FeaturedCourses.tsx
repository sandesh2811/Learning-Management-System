import CoursesLoading from "@/components/shared/CoursesLoading";
import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import FeaturedCoursesCardsWrapper from "@/features/featuredcourses/components/FeaturedCoursesWrapper";
import Heading from "@/features/featuredcourses/components/Heading";

import { Suspense } from "react";

const FeaturedCourses = () => {
    return (
        <section className="flex min-h-[50vh] flex-col gap-4">
            {/* Heading */}
            <Heading />

            {/* Featured courses */}
            <ErrorBoundaryWrapper>
                <Suspense fallback={<CoursesLoading />}>
                    <FeaturedCoursesCardsWrapper />
                </Suspense>
            </ErrorBoundaryWrapper>
        </section>
    );
};

export default FeaturedCourses;
