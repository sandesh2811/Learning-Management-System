import Wrapper from "@/components/shared/Wrapper";
import React, { ReactNode } from "react";
import Navbar from "../../components/pages/dashboard/navbar/Navbar";
import ReactScanInitializer from "@/ReactScanInitializer";
import { StoreProvider } from "@/components/shared/StoreProvider";
import ReduxPersistProvider from "@/components/shared/ReduxPersistProvider";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProvider>
            <ReduxPersistProvider>
                <ReactScanInitializer />
                <Wrapper className="font-manrope flex h-screen flex-col gap-8 md:max-w-[1350px]">
                    <Navbar />
                    {children}
                </Wrapper>
            </ReduxPersistProvider>
        </StoreProvider>
    );
};

export default layout;
