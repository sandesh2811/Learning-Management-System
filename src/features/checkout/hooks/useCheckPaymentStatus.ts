// Decode the url data
// Make backend request

import { api } from "@/lib/axios";

import { useSearchParams } from "next/navigation";

export const useCheckPaymentStatus = () => {
    const urlParams = useSearchParams();

    const esewaTransactionResponseData = urlParams.get("data");

    // const jsonString = atob(
    //     typeof esewaTransactionResponseData === "string"
    //         ? esewaTransactionResponseData
    //         : ""
    // );
    // const data = JSON.parse(jsonString);
    // console.log(data);

    const verifyStatus = async () => {
        const { data } = await api.post("/v1/order/payment-status", null, {
            params: {
                data: esewaTransactionResponseData,
            },
        });

        console.log(data);
    };

    verifyStatus();
};
