import { env } from "@/utils/checkEnv";
import crypto from "crypto";

/*
    Create a hmac instance with the secret key
    Update the hmac instance with the token value
    Send token with generated signature with the same hmac instance
*/

export const SignCookie = (token: string): string => {
    const hmac = crypto.createHmac("sha256", env.SIGNED_COOKIE_SECRET_KEY);

    hmac.update(token);

    return `${token}.${hmac.digest("hex")}`;
};

/*
    Extract the token and signature 
    Create  hmac instance with the same secret key
    Update the hmac instance with the extracted token 
    Generate expected signature 
    Send token based on the result after comparing extracted and generated signature
*/

export const VerifySignedCookie = (signedToken: string) => {
    const [token, signature] = signedToken.split(".");

    if (!token || !signature) return null;

    const hmac = crypto.createHmac("sha256", env.SIGNED_COOKIE_SECRET_KEY);

    hmac.update(token);

    const expectedSignature = hmac.digest("hex");

    return expectedSignature === signature ? token : null;
};
