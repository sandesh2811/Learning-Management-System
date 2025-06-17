import { cn } from "@/lib/utils";
import React from "react";

const Wrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "overflow-x-hidden p-4 md:mx-auto md:max-w-[1250px]",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Wrapper;
