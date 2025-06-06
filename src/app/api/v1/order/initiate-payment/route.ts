import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    OK,
} from "@/constants/Constants";

import { CreateInitialOrder } from "@/database/services/order/CreateOrder";

import { withMiddleware } from "@/middlewares/withMiddleware";
import { RateLimit } from "@/middlewares/rateLimit";

import { env } from "@/utils/checkEnv";
import { API_RESPONSE } from "@/utils/API_Response";

import { connectDB } from "@/lib/dbConnect";
import { generateSignatureForPayment } from "@/lib/generateSignature";

import { NextRequest } from "next/server";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";

/*
    Get the amount, courseId , customerId from the frontend

    Set the payment data
    Generate the signature with the necessary payment data

    Make payment request to the esewa url
    If response is OK send response url 
    Create the order
    If response is not ok send respective response
*/

type PaymenDataType = {
    amount: string;
    failure_url: string;
    product_delivery_charge: string;
    product_service_charge: string;
    product_code: string;
    signed_field_names: string;
    success_url: string;
    tax_amount: string;
    total_amount: string;
    transaction_uuid: string;
    signature?: string;
};

const handler = async (req: NextRequest) => {
    const { amount, courseId, customerId } = await req.json();
    const transactionId = uuidV4();

    // Set the payment data info
    let paymentData: PaymenDataType = {
        amount,
        failure_url: env.ESEWA_FAILURE_URI,
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: env.ESEWA_MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: env.ESEWA_SUCCESS_URI,
        tax_amount: "0",
        total_amount: amount,
        // transaction_uuid: courseId,
        transaction_uuid: transactionId,
    };

    const signatureString = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;

    // Generate signature
    const signature = generateSignatureForPayment(
        signatureString,
        env.ESEWA_SECRET_KEY
    );

    // Add generated signature into the payment data
    paymentData = { ...paymentData, signature };

    try {
        await connectDB();

        // Post request to esewa url with payment data
        const initiatePayment = await axios.post(env.ESEWA_PAYMENT_URI, null, {
            params: paymentData,
        });

        // Send response url
        if (initiatePayment.status === 200) {
            // Create order (intially pending status)
            await CreateInitialOrder({
                amount,
                courseId,
                customerId,
                transactionId,
            });

            return API_RESPONSE<string>(OK, {
                success: true,
                message: "Payment Initiated!",
                data: initiatePayment.request.res.responseUrl,
            });
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Couldn't initiate payment!",
                error,
            });
        }
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error,
        });
    }
};

export const POST = withMiddleware([RateLimit], handler);
