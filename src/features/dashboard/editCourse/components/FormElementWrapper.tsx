import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2">
            {children}
        </div>
    );
};

export default Wrapper;
