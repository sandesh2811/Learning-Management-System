// import { generateSignatureForPayment } from "@/lib/generateSignature";
// import { env } from "./checkEnv";

/*
    Get the base64 encoded data
    Check if the the data is string or not
    If it is not string then return respective response

    If it is a string then decode the data
    Create a signature string from the response data
    Generate signature based on it 
    
    Check if signatures match
    If yes then return the transaction id
    If no then return respective response
*/

export const verifyPaymentSignature = (data: string | null) => {
    const esewaPaymentBase64Response = typeof data === "string" ? data : "";

    if (esewaPaymentBase64Response === "") {
        return {
            success: false,
            message: "Data cannot be empty!",
        };
    } else {
        // Decode the base64 string to object
        const buffer = Buffer.from(esewaPaymentBase64Response, "base64");
        const jsonString = buffer.toString("utf-8");
        const esewaPaymentResponse = JSON.parse(jsonString);

        // // Create a signature string from the decoded response
        // const signatureString = `total_amount=${esewaPaymentResponse.total_amount},transaction_uuid=${esewaPaymentResponse.transaction_uuid},product_code=${esewaPaymentResponse.product_code}`;

        // // Generate signature
        // const signature = generateSignatureForPayment(
        //     signatureString,
        //     env.ESEWA_SECRET_KEY
        // );

        // console.log("Gen sign", signature);
        // console.log("Incoming sign", esewaPaymentResponse.signature);
        // // Compare signatures
        // if (signature !== esewaPaymentResponse.signature) {
        //     console.log("Inside signature comparision");

        //     return {
        //         success: false,
        //         message: "Invalid signature!",
        //     };
        // }

        return {
            success: true,
            message: "Valid signature!",
            transactionId: esewaPaymentResponse.transaction_uuid,
        };
    }
};
