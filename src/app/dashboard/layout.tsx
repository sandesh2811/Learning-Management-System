import Wrapper from "@/components/shared/Wrapper";
import React, { ReactNode } from "react";
import Navbar from "../../components/pages/dashboard/navbar/Navbar";
import ReactScanInitializer from "@/ReactScanInitializer";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <ReactScanInitializer />
            <Wrapper className="font-manrope flex h-screen flex-col gap-8 md:max-w-[1350px]">
                <Navbar />
                {children}
            </Wrapper>
        </>
    );
};

export default layout;
