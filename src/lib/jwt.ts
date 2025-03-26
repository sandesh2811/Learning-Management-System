import { env } from "@/utils/checkEnv";

import jwt from "jsonwebtoken";

/*
    Get all the required values for jwt payload
    Generate access & refresh tokens
    Send tokens based on token type recieved
*/

const GenerateJwtToken = ({
    role,
    userId,
    tokenType,
}: {
    role?: string;
    userId: string;
    tokenType: "access" | "refresh";
}): string => {
    const JWT_Payload = {
        role,
        userId,
    };

    const access_token = jwt.sign(
        JWT_Payload,
        env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY,
        }
    );

    const refresh_token = jwt.sign(
        { userId },
        env.JWT_REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: env.JWT_REFRESH_TOKEN_EXPIRY,
        }
    );

    return tokenType === "access" ? access_token : refresh_token;
};

export { GenerateJwtToken };
