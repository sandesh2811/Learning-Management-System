import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    UNAUTHORIZED,
} from "@/constants/Constants";

import { VerifySignedCookie } from "@/lib/cookie";
import { VerifyJwtToken } from "@/lib/jwt";
import { API_RESPONSE } from "@/utils/API_Response";

import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";

/*
    Get the access token from the request/headers
    If token not found then send respective response

    If token is found (generally a signed token)
    Verify the signature
    If not verified send respective response

    If token is verified (signature is verified) then verify the token (jwt token verification)
    If token is invalid or expired send respective response

    If token is valid then let the user continue to the required routes
*/

export const CheckSession = async (req: CustomNextRequest) => {
    // Get access token
    const access_token = req.cookies.get("access_token")?.value;

    if (!access_token)
        return API_RESPONSE(UNAUTHORIZED, {
            success: false,
            message: "Unauthorized!",
        });

    // Verify cookie signature
    const token = VerifySignedCookie(access_token);

    if (!token)
        return API_RESPONSE(UNAUTHORIZED, {
            success: false,
            message: "Unauthorized!",
        });

    try {
        // Verify jwt token
        const user = VerifyJwtToken({
            token: token,
            tokenType: "access_token",
        });

        if (!user) {
            return API_RESPONSE(UNAUTHORIZED, {
                success: false,
                message: "Unauthorized!",
            });
        }

        // Add user object to the request
        req.user = user;

        // Continue routing to specific api route
        NextResponse.next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return API_RESPONSE(UNAUTHORIZED, {
                success: false,
                message: `Unauthorized! ${error.message}`,
            });
        }
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};
