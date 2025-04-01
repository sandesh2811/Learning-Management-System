import mongoose, { Model, Schema } from "mongoose";

type OrderSchemaType = {
    customerId: Schema.Types.ObjectId;
    courseId: Schema.Types.ObjectId;
    amount: number;
    transactionId: string;
    status: "FAILED" | "PENDING" | "COMPLETE";
};

const OrderSchema = new Schema<OrderSchemaType>(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Customer id is required!"],
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "Course id is required!"],
        },
        amount: {
            type: Number,
            min: 0,
            required: [true, "Course price is required!"],
        },
        transactionId: {
            type: String,
            required: [true, "Transaction id is required!"],
        },
        status: {
            type: String,
            required: [true, "Payment status is required!"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

export const OrderModel =
    (mongoose.models.Order as Model<OrderSchemaType>) ||
    mongoose.model<OrderSchemaType>("Order", OrderSchema);
