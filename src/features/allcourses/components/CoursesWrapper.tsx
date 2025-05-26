"use client";

import { useGetAllCourses } from "../hooks/useGetAllCourses";

import { useUserTypingContext } from "../context/UserTyping";

import CoursesLoading from "@/components/shared/course/CoursesLoading";
import CourseCard from "./CourseCard";
import { ErrorUI } from "@/components/shared/ErrorBoundary";

interface CoursesWrapperProps {
    searchParams: SearchParamsType;
}

const CoursesWrapper = ({ searchParams }: CoursesWrapperProps) => {
    /* Get all the courses with specified search params (can be undefined initially!) */
    const {
        courses,
        success,
        message,
        isFetchingNextPage,
        error,
        isError,
        isLoading,
    } = useGetAllCourses(searchParams);

    /* Get the boolean if user is typing or not */
    const { isUserTyping } = useUserTypingContext();

    if (isUserTyping) return <CoursesLoading length={6} />;

    if (courses?.length === 0 && !success)
        return <span className="font-light md:text-xl">{message}</span>;

    if (isLoading) return <CoursesLoading length={6} />;

    if (isError && !courses) throw error;

    return (
        <>
            <section className="flex grid-cols-2 flex-wrap items-center justify-center gap-10 md:grid lg:grid-cols-3">
                {courses?.map((course) => (
                    <CourseCard course={course} key={course._id} />
                ))}
            </section>
            {isFetchingNextPage && <CoursesLoading length={6} />}
            {isError && <ErrorUI />}
        </>
    );
};

export default CoursesWrapper;
