"use client";

import Button from "@/components/ui/Button";
import { Span } from "@/components/ui/Span";
import { useActiveState } from "@/hooks/useActiveState";

import { GoTrash, GoX } from "react-icons/go";
import { AnimatePresence, motion as m } from "motion/react";
import { ConfirmationModalVariant } from "../../animation/variants";

const CreatedCourses = () => {
    return (
        <div className="flex flex-col gap-8">
            <CreatedCourseHeader />
            <CreateCoursesBody />
        </div>
    );
};

export default CreatedCourses;

const CreatedCourseHeader = () => {
    return (
        <div className="flex justify-between">
            <h3 className="mid:text-2xl text-lg font-semibold">Your Courses</h3>
            <Button className="mid:text-base text-xs">Create Course</Button>
        </div>
    );
};

const CreateCoursesBody = () => {
    const { isActive, setActiveStateTrue, setActiveStateFalse } =
        useActiveState();

    return (
        <div className="flex grid-cols-2 flex-wrap items-center justify-between gap-6 md:grid">
            {Array.from({ length: 5 }).map((_, idx) => (
                <div
                    key={idx}
                    className="border-primary-text/20 shadow-primary-text/5 flex min-h-[20vh] w-full flex-col gap-4 rounded-sm border-[1.2px] p-6 shadow-xl xl:max-w-[640px]"
                >
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            <h4 className="text-xl font-medium">
                                Advanced Devops
                            </h4>
                            <span className="text-sm md:text-base">
                                Published on: <b>{new Date().toDateString()}</b>
                            </span>
                            <span className="text-sm md:text-base">
                                Enrolled students: 2000
                            </span>
                            <span className="text-sm md:text-base">
                                Duration: 3 months
                            </span>
                            <span className="text-sm md:text-base">
                                Average rating: 4.5
                            </span>
                        </div>

                        <div>
                            <Span
                                className="bg-secondary-background block rounded-full p-2"
                                onClick={setActiveStateTrue}
                            >
                                <GoTrash />
                            </Span>
                        </div>
                    </div>

                    <Button className="w-full">Edit Course </Button>
                </div>
            ))}

            <AnimatePresence>
                {!!isActive && (
                    <ConfirmationModal
                        setActiveStateFalse={setActiveStateFalse}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

interface ConfirmationModalProps {
    setActiveStateFalse: () => void;
}

const ConfirmationModal = ({ setActiveStateFalse }: ConfirmationModalProps) => {
    return (
        <m.div
            variants={ConfirmationModalVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-primary-text/20 absolute top-0 left-0 flex h-screen w-full items-center justify-center px-4 backdrop-blur-sm"
        >
            <div className="bg-background shadow-primary-text/5 mid:w-[550px] mid:p-6 min-h-[25vh] w-full justify-between rounded-md p-4 shadow-xl md:w-[700px]">
                <div className="flex justify-end">
                    <Span onClick={setActiveStateFalse}>
                        <GoX size={22} />
                    </Span>
                </div>

                <div className="mid:gap-0 flex min-h-[20vh] flex-col justify-between gap-6">
                    <div className="flex flex-col justify-between">
                        <h5 className="text-xl font-semibold">
                            Are you sure you wan&apos;t delete this course?
                        </h5>
                        <span className="text-primary-text/80 text-sm">
                            Please note that once the course is deleted it is
                            irreversible. This may affect the students who are
                            currently enrolled in this course.
                        </span>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            onClick={setActiveStateFalse}
                            className="w-[150px]"
                            variant="skeleton"
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" className="w-[150px]">
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </m.div>
    );
};
