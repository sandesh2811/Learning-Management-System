import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    OK,
    INTERNAL_SERVER_ERROR_MESSAGE,
} from "@/constants/Constants";

import { GetUser } from "@/database/services/auth/UserLogin";
import LoginSchema from "@/validators/auth/LoginSchema";

import { withMiddleware } from "@/middlewares/withMiddleware";
import { RateLimit } from "@/middlewares/rateLimit";

import { ComparePassword } from "@/lib/bcrypt";
import { connectDB } from "@/lib/dbConnect";
import { GenerateJwtToken } from "@/lib/jwt";
import { SignCookie } from "@/lib/cookie";

import { API_RESPONSE } from "@/utils/API_Response";
import { SetCookies } from "@/utils/setCookies";

import { NextRequest } from "next/server";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

/*
    Get username and password from user.
    Check if there are any missing fields.
    If all fields are not present then send respective response

    Validate user sent credentials
    If validation fails send respective response

    Find user with same username in the database
    If user is not found then send respective response
    If user is found then compare passwords
    If passwords don't match then send respective response

    If passwords match generate refresh and access tokens
    Set the access and refresh token to user as http only signed cookies
    Send user details
*/

const handler = async (request: NextRequest) => {
    try {
        await connectDB();

        const { username, password } =
            (await request.json()) as LoginRouteBodyType;

        if (!username || !password)
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Username or password missing!",
            });

        // Validate user sent data
        const validatedUserData = await LoginSchema.parseAsync({
            username,
            password,
        });

        // Get user from database
        const user = await GetUser(validatedUserData.username);

        if (!user) {
            return API_RESPONSE(NOT_FOUND, {
                success: false,
                message: "Invalid credentials!",
            });
        }

        // Compare passwords
        const isSamePassword = await ComparePassword({
            hashedPassword: user.password,
            password: validatedUserData.password,
        });

        if (!isSamePassword)
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Invalid Credentials!",
            });

        // Generate tokens
        const access_token = GenerateJwtToken({
            role: user.role,
            userId: user._id as string,
            tokenType: "access",
        });

        const refresh_token = GenerateJwtToken({
            userId: user._id as string,
            tokenType: "refresh",
        });

        // Sign cookies
        const signedAccessToken = SignCookie(access_token);
        const signedRefreshToken = SignCookie(refresh_token);

        // Set cookies
        await SetCookies({ signedAccessToken, signedRefreshToken });

        const userData: LoggedInUserType = {
            username: user.username,
            userId: user._id as string,
            role: user.role,
            fullname: user.fullname,
        };

        return API_RESPONSE<LoggedInUserType>(OK, {
            success: true,
            message: "Logged in successfully!",
            data: userData,
        });
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: error.message,
            });
        } else if (error instanceof ZodError) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: error.errors[0].message,
            });
        }
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};

export const POST = withMiddleware([RateLimit], handler);
