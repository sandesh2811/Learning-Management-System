import { OrderModel } from "@/database/models/OrderModel";
import { Schema } from "mongoose";

export const UpdateOrderStatus = async (
    courseId: Schema.Types.ObjectId | undefined,
    status: string
) => {
    const order = await OrderModel.findOneAndUpdate(
        { courseId },
        { $set: { status } },
        { $new: true }
    );

    if (!order) {
        return {
            success: false,
            message: "Couldn't place order!",
        };
    }

    return {
        success: true,
        message: "Order placed successfully!",
    };
};
