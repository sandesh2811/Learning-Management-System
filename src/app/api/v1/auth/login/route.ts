import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/Constants";
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { GetUser } from "@/database/services/auth/UserLogin";
import LoginSchema from "@/validators/auth/LoginSchema";

import { ComparePassword } from "@/lib/bcrypt";
import { connectDB } from "@/lib/dbConnect";
import { GenerateJwtToken } from "@/lib/jwt";

import { API_RESPONSE } from "@/utils/API_Response";
import { env } from "@/utils/checkEnv";

import { NextRequest } from "next/server";
import { cookies } from "next/headers";
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
    Set the access and refresh token to user as http only cookies
    Send user details
*/

export const POST = async (request: NextRequest) => {
    /*
    Todo : 
    Encrypt refresh token and decide where to store refresh token (database/redis)
    Sign cookies
    */
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

        if (!user)
            return API_RESPONSE(NOT_FOUND, {
                success: false,
                message: "User doesnot exist!",
            });

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

        // Set access and refresh token
        (await cookies()).set("access_token", access_token, {
            httpOnly: true,
            secure: env.NODE_ENV === "development" ? false : true,
            sameSite: "strict",
            expires: Number(env.ACCESS_TOKEN_COOKIE_EXPIRY),
        });

        (await cookies()).set("refresh_token", refresh_token, {
            httpOnly: true,
            secure: env.NODE_ENV === "development" ? false : true,
            sameSite: "strict",
            expires: Number(env.REFRESH_TOKEN_COOKIE_EXPIRY),
        });

        const userData: LoggedInUserType = {
            username: user.username,
            userId: user._id as string,
            role: user.role,
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
