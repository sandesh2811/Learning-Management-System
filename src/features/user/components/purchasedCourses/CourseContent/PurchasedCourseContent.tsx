"use client";

import { useActiveState } from "@/hooks/useActiveState";
import { useDetermineScreenSize } from "@/hooks/useDetermineScreenSize";

import Sidebar from "./Sidebar";
import Content from "./Content";

import { useEffect, useState } from "react";

const PurchasedCourseContentPage = () => {
    /* Get the active state and methods */
    const {
        isActive,
        setActiveStateFalse,
        setActiveStateTrue,
        toggleActiveState,
    } = useActiveState();

    const [selectedChapter, setSelectedChapter] = useState<number>(1);

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
                    selectedChapter={selectedChapter}
                    setSelectedChapter={setSelectedChapter}
                />
            )}

            {/* ACTUAL CONTENT */}
            <Content
                isActive={isActive}
                toggleActiveState={toggleActiveState}
            />
        </div>
    );
};

export default PurchasedCourseContentPage;
