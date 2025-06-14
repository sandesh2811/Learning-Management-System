import ReactScanInitializer from "@/ReactScanInitializer";

import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Wrapper from "@/components/shared/Wrapper";
import Footer from "@/components/shared/Footer";
import { StoreProvider } from "@/components/shared/StoreProvider";
import ReactQueryProvider from "@/components/shared/ReactQueryProvider";
import ReduxPersistProvider from "@/components/shared/ReduxPersistProvider";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RouteChangeTracker from "@/components/shared/RouteChangeTracker";

export const metadata: Metadata = {
    title: "Learning Management System",
    description: "Fullstack Nextjs LMS app",
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-manrope">
                <ReactScanInitializer />
                <ReactQueryProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <StoreProvider>
                        <ReduxPersistProvider>
                            <Wrapper>
                                <Navbar />
                                {children}
                                {modal}
                                <Footer />
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
                                <RouteChangeTracker />
                            </Wrapper>
                        </ReduxPersistProvider>
                    </StoreProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
