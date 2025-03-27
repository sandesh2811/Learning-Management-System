import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-6 md:mx-auto md:max-w-[1050px]">{children}</div>;
};

export default Wrapper;
