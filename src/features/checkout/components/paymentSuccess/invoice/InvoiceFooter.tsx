"use client";

import Button from "@/components/ui/Button";

import dynamic from "next/dynamic";

const InvoiceDownload = dynamic(() => import("../invoicePDF/InvoiceDownload"), {
    ssr: false,
});

const InvoiceFooter = () => {
    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex justify-end">
                <InvoiceDownload>
                    <Button className="p-3 text-sm">Download Invoice</Button>
                </InvoiceDownload>
            </div>

            <span className="text-sm">
                <b>Note</b>: Please download or screenshot the invoice since it
                can be used as proof in case of any difficulty!
            </span>
        </div>
    );
};

export default InvoiceFooter;
