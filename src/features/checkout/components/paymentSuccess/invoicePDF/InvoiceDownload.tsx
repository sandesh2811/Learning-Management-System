"use client";

import { InvoicePDF } from "./InvoicePDF";

import { ReactNode } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";

const InvoiceDownload = ({ children }: { children: ReactNode }) => {
    const userInfoForEnrollment = useSelector(
        (state: RootState) => state.userInfoForEnrollment
    );
    const selectedCourse = useSelector(
        (state: RootState) => state.selectedCourse
    );

    const currentDate = new Date().toDateString();

    return (
        <PDFDownloadLink
            document={
                <InvoicePDF
                    userInfoForEnrollment={userInfoForEnrollment}
                    selectedCourse={selectedCourse}
                    currentDate={currentDate}
                />
            }
            fileName="invoice.pdf"
        >
            {children}
        </PDFDownloadLink>
    );
};

export default InvoiceDownload;
