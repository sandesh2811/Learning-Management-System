"use client";

import { useCheckPaymentStatus } from "@/features/checkout/hooks/useCheckPaymentStatus";
import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

const CustomerDetails = () => {
    const userInfoForEnrollment = useSelector(
        (state: RootState) => state.userInfoForEnrollment
    );

    const currentDate = new Date().toDateString();

    // const data = useCheckPaymentStatus();

    return (
        <div className="flex-1">
            <div className="flex flex-col gap-1">
                <Span title="Name" value={userInfoForEnrollment.fullname} />
                <Span title="Email" value={userInfoForEnrollment.email} />
                <Span
                    title="Payment Method"
                    value={userInfoForEnrollment.paymentMethod}
                />
                <Span title="Purchase Date" value={currentDate} />
                <Span title="Invoice Id" value={"123"} />
            </div>
        </div>
    );
};

export default CustomerDetails;

interface SpanProps {
    title: string;
    value: string;
}

const Span = ({ title, value }: SpanProps) => {
    return (
        <span className="mid:text-base text-[15px]">
            <b>{title}</b>: {value}
        </span>
    );
};
