import { api } from "@/lib/axios";

import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { useState } from "react";

export const useInitiatePayment = () => {
    const { loggedinUser, selectedCourse } = useSelector(
        (state: RootState) => state
    );

    const [isRedirecting, setRedirecting] = useState<boolean>(false);

    const initiatePayment = async () => {
        setRedirecting(true);
        const { data } = await api.post("/v1/order/initiate-payment", {
            amount: selectedCourse.price,
            courseId: selectedCourse.id,
            customerId: loggedinUser.userId,
        });

        if (data.success) {
            setRedirecting(false);
            window.location.href = data.data;
        }
    };

    return {
        isRedirecting,
        initiatePayment,
    };
};
