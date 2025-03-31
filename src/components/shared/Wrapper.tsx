import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="overflow-x-hidden p-4 md:mx-auto md:max-w-[1250px]">
            {children}
        </div>
    );
};

export default Wrapper;
