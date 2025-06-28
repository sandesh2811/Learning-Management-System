import Wrapper from "@/components/shared/Wrapper";
import ReactScanInitializer from "@/ReactScanInitializer";
import { StoreProvider } from "@/components/shared/StoreProvider";
import Navbar from "../../components/pages/dashboard/navbar/Navbar";
import ReduxPersistProvider from "@/components/shared/ReduxPersistProvider";
import ReactQueryProvider from "@/components/shared/ReactQueryProvider";

import { Toaster } from "sonner";
import React, { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProvider>
            <ReduxPersistProvider>
                <ReactScanInitializer />
                <ReactQueryProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
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
                </ReactQueryProvider>
            </ReduxPersistProvider>
        </StoreProvider>
    );
};

export default layout;
