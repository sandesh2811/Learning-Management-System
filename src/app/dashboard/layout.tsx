import Wrapper from "@/components/shared/Wrapper";
import React, { ReactNode } from "react";
import Navbar from "../../components/pages/dashboard/navbar/Navbar";
import ReactScanInitializer from "@/ReactScanInitializer";
import { StoreProvider } from "@/components/shared/StoreProvider";
import ReduxPersistProvider from "@/components/shared/ReduxPersistProvider";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProvider>
            <ReduxPersistProvider>
                <ReactScanInitializer />
                <Wrapper className="font-manrope flex h-screen flex-col gap-8 md:max-w-[1350px]">
                    <Toaster
                        position="top-right"
                        richColors={true}
                        toastOptions={{
                            style: {
                                fontSize: "15px",
                                fontWeight: "bold",
                            },
                            duration: 1800,
                        }}
                    />
                    <Navbar />
                    {children}
                </Wrapper>
            </ReduxPersistProvider>
        </StoreProvider>
    );
};

export default layout;
