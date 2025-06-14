"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { updateOrderStatus } from "../../api/updateOrderStatus";
import { toast } from "sonner";

const StatusCheck = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        const initiateStatusCheck = async () => {
            const { success, message } = await updateOrderStatus(params);

            if (success) {
                toast.success(message);
            } else if (!success) {
                toast.error(message);
            }
        };

        initiateStatusCheck();
    }, [searchParams]);

    return null;
};

export default StatusCheck;
