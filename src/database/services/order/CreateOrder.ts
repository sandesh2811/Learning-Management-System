import { OrderModel } from "@/database/models/OrderModel";

type CreateInitialOrderType = {
    amount: string;
    courseId: string;
    customerId: string;
    transactionId: string;
};

export const CreateInitialOrder = async ({
    amount,
    courseId,
    customerId,
    transactionId,
}: CreateInitialOrderType): Promise<void> => {
    await OrderModel.create({
        amount,
        courseId,
        customerId,
        transactionId,
    });
};
