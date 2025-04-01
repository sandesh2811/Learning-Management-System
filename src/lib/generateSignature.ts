import crypto from "crypto";

/*
    Create hmac instance
    Update the hmac instance's value with the data
    Generate the signature
    Return the signature
*/

export const generateSignatureForPayment = (
    data: string,
    secret: string
): string => {
    if (!data || !secret) throw new Error("Both data and secret are required!");

    const hashInstance = crypto.createHmac("sha256", secret);
    const hashInstanceValue = hashInstance.update(data);
    const signature = hashInstanceValue.digest("base64");

    return signature;
};
