import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
} from "@/constants/Constants";

import { env } from "@/utils/checkEnv";
import { connectDB } from "@/lib/dbConnect";
import { API_RESPONSE } from "@/utils/API_Response";
import { GetOrder } from "@/database/services/order/Order";
import { UpdateOrderStatus } from "@/database/services/order/UpdateOrderStatus";

import { NextRequest } from "next/server";
import axios from "axios";
import { verifyPaymentSignature } from "@/utils/verifyPaymentSignature";
import { withMiddleware } from "@/middlewares/withMiddleware";
import { RateLimit } from "@/middlewares/rateLimit";

/*
    Get transaction id (which is transaction_uuid) from the request 

    Get the order by the transaction id
    If not found send respective response
    If found make a request to the esewa status check url
    Parse the incoming response

    Update the order status based on the parsed response
    Send respective response
*/

const handler = async (req: NextRequest) => {
    // const { transactionId } = await req.json();

    // Get the base64 encoded data from the URL
    const params = req.nextUrl.searchParams;
    const data = params.get("data");

    console.log(data, "base64 response data");

    // Decode the base64 data
    const { success, message, transactionId } = verifyPaymentSignature(data);

    if (!success) {
        return API_RESPONSE(NOT_FOUND, {
            success,
            message,
        });
    }

    try {
        await connectDB();

        // Get the order from the database
        const { success, message, order } = await GetOrder(transactionId);

        if (!success) {
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
                data: order,
            });
        }

        const paymentData = {
            product_code: env.ESEWA_MERCHANT_ID,
            total_amount: order?.amount,
            transaction_uuid: transactionId,
        };

        // Make request to esewa status check url
        const paymentResponse = await axios.get(env.ESEWA_STATUS_CHECK_URI, {
            params: paymentData,
        });

        // Parse the response
        const paymentStatusData = JSON.parse(JSON.stringify(paymentResponse));

        if (paymentStatusData.status === 200) {
            // Update the status of order (pending to completed)
            const { success, message } = await UpdateOrderStatus(
                order?.courseId,
                paymentStatusData.data.status
            );

            return API_RESPONSE(CREATED, {
                success,
                message,
            });
        }
    } catch (error) {
        console.log(error);

        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};

export const POST = withMiddleware([RateLimit], handler);
