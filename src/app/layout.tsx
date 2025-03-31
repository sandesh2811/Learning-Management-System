import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Wrapper from "@/components/shared/Wrapper";
import Footer from "@/components/shared/Footer";

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
                <Wrapper>
                    <Navbar />
                    {children}
                    {modal}
                    <Footer />
                </Wrapper>
            </body>
        </html>
    );
}
