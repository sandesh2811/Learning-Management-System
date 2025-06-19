"use client";

import { type UserCreatedCoursesType } from "../schemas/userCreatedCoursesSchema";

import { useActiveState } from "@/hooks/useActiveState";

import { Span } from "@/components/ui/Span";
import Button from "@/components/ui/Button";
import ConfirmationModal from "./ConfirmationModal";

import { memo, useState } from "react";
import { GoTrash } from "react-icons/go";
import { AnimatePresence } from "motion/react";

interface CreatedCoursesProps {
    userCreatedCourses: UserCreatedCoursesType;
}

const CreatedCourses = ({ userCreatedCourses }: CreatedCoursesProps) => {
    /* Get the active state */
    const { isActive, setActiveStateTrue, setActiveStateFalse } =
        useActiveState();

    /* For course deletion */
    const [selectedCourseId, setCourseId] = useState<string | null>(null);

    /* Show confirmation modal as well as set the courseId */
    const handleTrashIconClick = (courseId: string) => () => {
        setCourseId(courseId);
        setActiveStateTrue();
    };

    return (
        <div className="flex grid-cols-2 flex-wrap items-center justify-between gap-6 md:grid">
            {userCreatedCourses.map((course) => (
                <div
                    key={course._id}
                    className="border-primary-text/20 shadow-primary-text/5 flex min-h-[20vh] w-full flex-col gap-4 rounded-sm border-[1.2px] p-6 shadow-xl xl:max-w-[640px]"
                >
                    <div className="flex justify-between">
                        {/* COURSE INFO */}
                        <CreatedCourseInfo
                            title={course.title}
                            rating={course.rating}
                            duration={course.duration}
                            publishedOn={new Date(
                                course.createdAt
                            ).toDateString()}
                            enrolledStudentsCount={course.enrolledStudentsCount}
                        />

                        {/* DELETE BUTTON */}
                        <div>
                            <Span
                                className="bg-secondary-background block rounded-full p-2"
                                onClick={handleTrashIconClick(course._id)}
                            >
                                <GoTrash />
                            </Span>
                        </div>
                    </div>

                    {/* EDIT BUTTON */}
                    <Button className="w-full">Edit Course </Button>
                </div>
            ))}

            <AnimatePresence>
                {!!isActive && (
                    <ConfirmationModal
                        selectedCourseId={selectedCourseId}
                        setActiveStateFalse={setActiveStateFalse}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreatedCourses;

/* WRAPPER SPAN COMPONENT */

interface WrapperSpanProps {
    title: string;
    value: string | number;
}

const WrapperSpan = ({ title, value }: WrapperSpanProps) => {
    return (
        <span className="text-sm md:text-base">
            {title} : {value}
        </span>
    );
};

/* CREATED COURSE INFO COMPONENT */

interface CreatedCourseInfoProps {
    title: string;
    publishedOn: string;
    enrolledStudentsCount: number;
    duration: string;
    rating: number;
}

const CreatedCourseInfo = memo(
    ({
        title,
        rating,
        duration,
        publishedOn,
        enrolledStudentsCount,
    }: CreatedCourseInfoProps) => {
        return (
            <div className="flex flex-col gap-1">
                <h4 className="text-xl font-medium">{title}</h4>
                <span className="text-sm md:text-base">
                    Published on: <b>{publishedOn}</b>
                </span>

                <WrapperSpan
                    title="Enrolled students"
                    value={enrolledStudentsCount}
                />

                <WrapperSpan title="Duration" value={duration} />

                <WrapperSpan title="Average rating" value={rating} />
            </div>
        );
    }
);

CreatedCourseInfo.displayName = "User created course info";
