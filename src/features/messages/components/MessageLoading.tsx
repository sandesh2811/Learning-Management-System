import React from "react";
import { CiChat1 } from "react-icons/ci";

const MessageLoading = () => {
    return (
        <div className="flex h-[80vh]">
            <SidebarLoading />

            {/* FALLBACK UI */}
            <div className="border-primary-text/10 hidden h-full w-full flex-col items-center justify-center gap-4 rounded-md border-t-[1.2px] border-r-[1.2px] border-b-[1.2px] md:flex">
                <CiChat1
                    size={80}
                    className="text-primary-text/20 animate-pulse"
                />
                <span className="bg-primary-text/20 h-[25px] w-[400px] animate-pulse rounded-sm" />
                <span className="bg-primary-text/20 h-[20px] w-[200px] animate-pulse rounded-sm" />
            </div>
        </div>
    );
};

export default MessageLoading;

/* MESSAGE SIDEBAR COMPONENT */

const SidebarLoading = () => {
    return (
        <div
            className={`bg-background border-primary-text/10 flex h-[80vh] w-full flex-col gap-7 rounded-md border-[1.2px] p-4 md:w-[41%] md:rounded-r-none lg:px-6`}
        >
            <span className="bg-primary-text/20 h-[35px] w-[150px] animate-pulse rounded-sm" />
            <div className="divide-primary-text/20 relative flex flex-col gap-3 divide-y-[1.2px] overflow-y-auto">
                {Array.from({ length: 9 }).map((_, idx) => (
                    <div
                        key={idx}
                        className={`flex min-h-[7vh] cursor-pointer items-center justify-between gap-6 transition-colors duration-300 lg:px-2`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="bg-primary-text/20 size-8 animate-pulse rounded-full" />
                            <span className="bg-primary-text/20 h-[15px] w-[120px] animate-pulse rounded-sm lg:w-[150px]" />
                        </div>
                        <span className="bg-primary-text/20 h-[15px] w-[15px] animate-pulse rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};

/* MESSAGE CONTAINER COMPONENT */

export const MessageContainerLoading = () => {
    const isSender = false;
    return (
        <div
            className={`border-primary-text/10 flex flex-1 flex-col justify-between gap-6 overflow-y-auto rounded-r-md border-t-[1.2px] border-r-[1.2px] border-b-[1.2px] p-4 lg:px-6`}
        >
            {/* HEADER */}
            <div className="border-primary-text/10 flex items-center justify-between border-b-[1.2px] pb-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-4">
                        <span className="bg-primary-text/20 size-8 animate-pulse rounded-full" />
                        <span className="bg-primary-text/20 h-[15px] w-[150px] animate-pulse rounded-sm" />
                    </div>
                </div>

                <span className="bg-primary-text/20 h-[8px] w-[35px] animate-pulse rounded-sm" />
            </div>

            {/* BODY */}
            <div className="flex h-[55vh] flex-col gap-6 overflow-y-auto">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <React.Fragment key={idx}>
                        <div
                            className={`flex w-[60%] ${isSender ? "justify-end self-end" : "justify-start self-start"}`}
                        >
                            <span
                                className={`bg-secondary-background w-[250px] animate-pulse rounded-sm p-6 font-medium`}
                            />
                        </div>
                        <div
                            className={`flex w-[60%] ${!isSender ? "justify-end self-end" : "justify-start self-start"}`}
                        >
                            <span
                                className={`bg-secondary-background w-[250px] animate-pulse rounded-sm p-6 font-medium`}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* FOOTER */}
            <div className="border-primary-text/10 flex items-center justify-between gap-2 border-t-[1.2px] pt-4">
                <span className="border-primary-text/30 bg-primary-text/20 w-full animate-pulse rounded-sm p-4" />
                <span className="border-primary-text/30 bg-primary-text/20 w-[200px] animate-pulse rounded-sm p-4" />
            </div>
        </div>
    );
};
