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

type VerifiedJWTReturnType = {
    role: string;
    userId: string;
    iat: number;
    exp: number;
};

const VerifyJwtToken = ({
    token,
    tokenType,
}: {
    token: string;
    tokenType: string;
}): VerifiedJWTReturnType => {
    const user = jwt.verify(
        token,
        tokenType === "access_token"
            ? env.JWT_ACCESS_TOKEN_SECRET_KEY
            : env.JWT_REFRESH_TOKEN_SECRET_KEY
    ) as VerifiedJWTReturnType;

    return user;
};

export { GenerateJwtToken, VerifyJwtToken };
