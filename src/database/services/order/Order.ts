import { OrderModel } from "@/database/models/OrderModel";

export const GetOrder = async (transactionId: string) => {
    const order = await OrderModel.findOne({ transactionId });

    if (!order) {
        return {
            success: false,
            message: "Couldn't find order!",
            order: null,
        };
    }

    return {
        success: true,
        message: "Order found successfully!",
        order,
    };
};
