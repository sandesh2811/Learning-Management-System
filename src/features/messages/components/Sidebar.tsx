import { Dispatch, SetStateAction } from "react";

interface SidebarProp {
    isActive: boolean;
    selectedConversation: number;
    setSelectedConversation: Dispatch<SetStateAction<number>>;
}

const Sidebar = ({
    isActive,
    selectedConversation,
    setSelectedConversation,
}: SidebarProp) => {
    return (
        <div
            className={`bg-background border-primary-text/10 flex h-[80vh] flex-col gap-7 rounded-md border-[1.2px] p-4 md:w-[30%] md:rounded-r-none lg:px-6 ${!!isActive && "absolute z-10 w-full rounded-md"} md:static`}
        >
            <h2 className="text-2xl font-semibold">Messages</h2>
            <div className="divide-primary-text/20 relative flex flex-col gap-3 divide-y-[1.2px] overflow-y-auto">
                {Array.from({ length: 15 }).map((_, idx) => (
                    <div
                        key={idx}
                        tabIndex={0}
                        onClick={() => setSelectedConversation(idx)}
                        className={`${selectedConversation === idx ? "bg-secondary-background/40" : "bg-none"} ${selectedConversation !== idx && "hover:bg-secondary-background/40"} flex min-h-[7vh] cursor-pointer items-center justify-between gap-4 transition-colors duration-300 lg:px-2`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="bg-primary-text/80 size-8 rounded-full"></span>
                            <h4 className="my-4 inline-flex font-medium text-wrap">
                                Hari Bahadur
                            </h4>
                        </div>
                        <span className="flex size-6 items-center justify-center rounded-full text-center text-base font-medium text-red-600">
                            <span>1</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
