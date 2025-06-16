import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    title: "Learning Management System",
    description: "Fullstack Nextjs LMS app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-manrope">{children}</body>
        </html>
    );
}
