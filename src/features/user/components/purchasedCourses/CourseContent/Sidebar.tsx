import { Dispatch, SetStateAction } from "react";

interface Sidebar {
    isActive: boolean;
    selectedChapter: number;
    setSelectedChapter: Dispatch<SetStateAction<number>>;
}

const Sidebar = ({
    isActive,
    selectedChapter,
    setSelectedChapter,
}: Sidebar) => {
    return (
        <div
            className={`bg-background border-primary-text/10 flex flex-col justify-between gap-7 rounded-md rounded-r-none border-t-[1.2px] border-b-[1.2px] border-l-[1.2px] p-4 md:w-[40%] lg:w-[30%] lg:px-6 ${!!isActive && "absolute z-10 w-full"} md:static`}
        >
            <h2 className="text-2xl font-semibold">Chapters</h2>
            <div className="divide-primary-text/20 relative flex flex-col gap-3 divide-y-[1.2px] overflow-y-auto">
                {Array.from({ length: 15 }).map((_, idx) => (
                    <div
                        key={idx}
                        tabIndex={0}
                        onClick={() => setSelectedChapter(idx + 1)}
                        className={`${selectedChapter === idx + 1 ? "bg-secondary-background/40" : "bg-none"} ${selectedChapter !== idx + 1 && "hover:bg-secondary-background/40"} flex min-h-[7vh] cursor-pointer items-center justify-between gap-2 transition-colors duration-300 lg:px-2`}
                    >
                        <h4 className="inline-flex font-medium text-wrap xl:text-lg">
                            {idx + 1}. Introduction to react
                        </h4>
                        <span className="text-primary-text/80 text-sm xl:text-base">
                            30 min
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
