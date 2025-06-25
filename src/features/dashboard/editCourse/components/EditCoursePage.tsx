"use client";

import { Span } from "@/components/ui/Span";

import { Dispatch, SetStateAction, useState } from "react";

const EditCoursePage = () => {
    const [activeTab, setActiveTab] = useState<string>("Basic Info");

    return (
        <div>
            <EditCourseHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
};

export default EditCoursePage;

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
                onClick={() => setActiveTab("Course Structure")}
                className={`mid:text-base flex flex-1 items-center justify-center rounded-sm p-1.5 text-sm font-medium transition-colors duration-150 ${activeTab === "Course Structure" ? "bg-background shadow-primary-text/20 shadow-2xl" : "bg-transparent"}`}
            >
                Course Structure
            </Span>
        </div>
    );
};
