"use client";

import { type SelectedCourseContentType } from "@/features/user/schemas/getSelectedCourseContentSchema";

import { useActiveState } from "@/hooks/useActiveState";
import { useDetermineScreenSize } from "@/hooks/useDetermineScreenSize";

import Sidebar from "./Sidebar";
import Content from "./Content";

import { useEffect, useState } from "react";

interface PurchasedCourseContentProps {
    courseContent: SelectedCourseContentType;
}

const PurchasedCourseContent = ({
    courseContent,
}: PurchasedCourseContentProps) => {
    const sidebarContent = courseContent.map((content) => ({
        contentId: content._id,
        title: content.title,
    }));

    const mainContent = courseContent.map((content) => ({
        video: content.video,
        description: content.description,
    }));

    /* Get the active state and methods */
    const {
        isActive,
        setActiveStateFalse,
        setActiveStateTrue,
        toggleActiveState,
    } = useActiveState();

    const [selectedChapter, setSelectedChapter] = useState<number>(0);

    /* Get the screen size */
    const screenSize = useDetermineScreenSize();

    /* Hide or show sidebar based on the screen size */
    useEffect(() => {
        if (screenSize === "xs" || screenSize === "sm") {
            setActiveStateFalse();
        } else {
            setActiveStateTrue();
        }
    }, [screenSize]);

    return (
        <div className="shadow-accent relative z-30 flex h-[85vh] overflow-hidden overflow-y-auto rounded-md shadow-md md:z-0">
            {/* SIDEBAR */}
            {!!isActive && (
                <Sidebar
                    isActive={isActive}
                    sidebarContent={sidebarContent}
                    selectedChapter={selectedChapter}
                    setSelectedChapter={setSelectedChapter}
                />
            )}

            {/* ACTUAL CONTENT */}
            <Content
                isActive={isActive}
                selectedContent={selectedChapter}
                mainContent={mainContent}
                toggleActiveState={toggleActiveState}
            />
        </div>
    );
};

export default PurchasedCourseContent;
