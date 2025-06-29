"use client";

import { useGetCourseToUpdate } from "@/features/dashboard/editCourse/hooks/useGetCourseToUpdate";

import { Span } from "@/components/ui/Span";
import BasicInfoUpdate from "./BasicInfoUpdate";
import CourseContentUpdate from "./CourseContentUpdate";

import { Dispatch, SetStateAction, useState } from "react";

interface EditCourseWrapperProps {
    id: string;
}

const EditCourseWrapper = ({ id }: EditCourseWrapperProps) => {
    const [activeTab, setActiveTab] = useState<string>("Basic Info");

    /* Get the course data to update */
    const { courseToUpdate } = useGetCourseToUpdate(id);

    return (
        <div>
            <EditCourseHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="mt-4">
                {activeTab === "Basic Info" ? (
                    <BasicInfoUpdate courseToUpdate={courseToUpdate} />
                ) : (
                    <CourseContentUpdate courseToUpdate={courseToUpdate} />
                )}
            </div>
        </div>
    );
};

export default EditCourseWrapper;

/* EDIT COURSE HEADER COMPONENT */

interface EditCourseHeaderProps {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
}

const EditCourseHeader = ({
    activeTab,
    setActiveTab,
}: EditCourseHeaderProps) => {
    return (
        <div className="bg-secondary-background flex w-full justify-between rounded-sm p-2">
            <Span
                onClick={() => setActiveTab("Basic Info")}
                className={`mid:text-base flex flex-1 items-center justify-center rounded-sm p-1.5 text-sm font-medium transition-colors duration-150 ${activeTab === "Basic Info" ? "bg-background shadow-primary-text/20 shadow-2xl" : "bg-transparent"}`}
            >
                Basic Info
            </Span>

            <Span
                onClick={() => setActiveTab("Course Content")}
                className={`mid:text-base flex flex-1 items-center justify-center rounded-sm p-1.5 text-sm font-medium transition-colors duration-150 ${activeTab === "Course Content" ? "bg-background shadow-primary-text/20 shadow-2xl" : "bg-transparent"}`}
            >
                Course Content
            </Span>
        </div>
    );
};
