import { api } from "@/lib/axios";

export const updateOrderStatus = async (params: URLSearchParams) => {
    const {
        data: { success, message },
    } = await api.post("/v1/order/payment-status", null, {
        params,
    });

    return {
        success,
        message,
    };
};
