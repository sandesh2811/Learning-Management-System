"use client";

import { useInitiatePayment } from "../../hooks/useInitiatePayment";

import Button from "@/components/ui/Button";
import CourseDetails from "./CourseDetails";
import BuyerDetails from "./BuyerDetails";
import Spinner from "@/components/ui/Spinner";

const Confirmation = () => {
    const { isRedirecting, initiatePayment } = useInitiatePayment();

    return (
        <div className="mid:justify-center bg-secondary-background mid:p-6 flex min-h-[55vh] w-full rounded-md px-4 py-8">
            <div className="mid:bg-background mid:w-[500px] mid:p-6 flex w-full flex-col gap-5 rounded-md md:w-[600px] md:p-8">
                <h3 className="text-2xl font-semibold">Order Summary</h3>
                <CourseDetails />
                <BuyerDetails />
                <Button
                    onClick={initiatePayment}
                    className={`mb-2 ${isRedirecting && "bg-primary-text/80"}`}
                >
                    {isRedirecting ? (
                        <Spinner message="Redirecting..." />
                    ) : (
                        "Proceed to pay"
                    )}
                </Button>
                <p className="text-sm">
                    <b>Note</b>: Please note that once the payment has been done
                    it can&apos;t be refunded. So please check all the details
                    carefully and proceed!
                </p>
            </div>
        </div>
    );
};

export default Confirmation;
