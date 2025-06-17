import { Dispatch, SetStateAction } from "react";

interface Sidebar {
    isActive: boolean;
    sidebarContent: {
        contentId: string;
        title: string;
    }[];
    selectedChapter: number;
    setSelectedChapter: Dispatch<SetStateAction<number>>;
}

const Sidebar = ({
    isActive,
    sidebarContent,
    selectedChapter,
    setSelectedChapter,
}: Sidebar) => {
    return (
        <div
            className={`bg-background border-primary-text/10 flex flex-col gap-7 rounded-md rounded-r-none border-t-[1.2px] border-b-[1.2px] border-l-[1.2px] p-4 md:w-[40%] lg:w-[35%] lg:px-6 ${!!isActive && "absolute z-10 w-full"} md:static`}
        >
            <h2 className="text-2xl font-semibold">Chapters</h2>
            <div className="divide-primary-text/20 relative flex flex-col gap-3 divide-y-[1.2px] overflow-y-auto">
                {sidebarContent.map((content, idx) => (
                    <div
                        key={idx}
                        tabIndex={0}
                        onClick={() => setSelectedChapter(idx)}
                        className={`${selectedChapter === idx ? "bg-secondary-background/40" : "bg-none"} ${selectedChapter !== idx && "hover:bg-secondary-background/40"} flex min-h-[7vh] cursor-pointer items-center justify-between gap-4 transition-colors duration-300 lg:px-2`}
                    >
                        <h4 className="my-4 inline-flex font-medium text-wrap">
                            {idx + 1}. {content.title}
                        </h4>
                        <span className="text-primary-text/80 text-sm">
                            30 min
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
