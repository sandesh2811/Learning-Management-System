import Heading from "@/features/featuredcourses/components/Heading";
import CoursesLoading from "@/components/shared/course/CoursesLoading";
import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import FeaturedCoursesCardsWrapper from "@/features/featuredcourses/components/FeaturedCoursesWrapper";

import { Suspense } from "react";

const FeaturedCourses = () => {
    return (
        <section className="flex min-h-[50vh] flex-col gap-4">
            {/* Heading */}
            <Heading text="Featured courses" />

            {/* Featured courses */}
            <ErrorBoundaryWrapper>
                <Suspense fallback={<CoursesLoading length={3} />}>
                    <FeaturedCoursesCardsWrapper />
                </Suspense>
            </ErrorBoundaryWrapper>
        </section>
    );
};

export default FeaturedCourses;
