import { useActiveState } from "@/hooks/useActiveState";

import RatingModal from "./RatingModal";
import { Span } from "@/components/ui/Span";

import { AnimatePresence } from "motion/react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

interface ContentProps {
    isActive: boolean;
    selectedContent: number;
    mainContent: {
        video: string;
        description: string;
    }[];
    toggleActiveState: () => void;
}

const Content = ({
    isActive,
    mainContent,
    selectedContent,
    toggleActiveState,
}: ContentProps) => {
    return (
        <div
            className={`border-primary-text/20 flex flex-1/2 flex-col gap-6 overflow-y-auto rounded-md border-t-[1.2px] border-r-[1.2px] border-b-[1.2px] p-4 ${!isActive ? "rounded-l-md border-l-[1.2px]" : "rounded-l-none border-t-[1.2px] border-r-[1.2px] border-b-[1.2px]"} min-h-[80vh] lg:px-6`}
        >
            {/* SIDEBAR CONTROL, COURSE PROGRESS AND RATING */}
            <ContentHeader
                isActive={isActive}
                toggleActiveState={toggleActiveState}
            />

            {/* COURSE VIDEO WITH DESCRIPTION */}
            <ChapterVideoAndInfo
                mainContent={mainContent}
                selectedContent={selectedContent}
            />
        </div>
    );
};

export default Content;

/* CONTENT HEADER COMPONENT */

interface ContentHeaderProps {
    isActive: boolean;
    toggleActiveState: () => void;
}

const ContentHeader = ({ isActive, toggleActiveState }: ContentHeaderProps) => {
    const {
        isActive: isModalActive,
        setActiveStateFalse,
        setActiveStateTrue,
    } = useActiveState();

    return (
        <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <Span
                className={`bg-secondary-background rounded-full p-2 md:static md:z-0 ${!isActive ? "static" : "absolute top-0 right-0 z-20"}`}
                onClick={() => toggleActiveState()}
            >
                {isActive ? (
                    <GoSidebarCollapse size={20} />
                ) : (
                    <GoSidebarExpand size={20} />
                )}
            </Span>

            <div className="flex w-full justify-between gap-4 md:justify-end">
                <span className="mid:text-base text-sm">0% completed</span>
                <Span
                    className="mid:text-base text-sm underline underline-offset-4"
                    onClick={setActiveStateTrue}
                >
                    Rate this course
                </Span>
            </div>

            <AnimatePresence>
                {!!isModalActive && (
                    <RatingModal
                        isModalActive={isModalActive}
                        setActiveStateFalse={setActiveStateFalse}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

/* CHAPTER VIDEO AND INFO COMPONENT */

interface ChapterVideoAndInfoProp {
    mainContent: {
        video: string;
        description: string;
    }[];
    selectedContent: number;
}

const ChapterVideoAndInfo = ({
    mainContent,
    selectedContent,
}: ChapterVideoAndInfoProp) => {
    return (
        <div className="border-primary-text/10 flex flex-col gap-4 overflow-y-auto">
            <div>
                <video
                    controls
                    playsInline
                    controlsList="nodownload"
                    className="aspect-video w-full rounded-sm"
                >
                    <source src="/video/demo.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold">About this chapter</h5>
                <p className="mid:text-base text-sm">
                    {mainContent[selectedContent].description}
                </p>
            </div>
        </div>
    );
};
