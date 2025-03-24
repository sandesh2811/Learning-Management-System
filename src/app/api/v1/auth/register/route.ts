import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/Constants";
import {
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
} from "@/constants/Constants";

import {
    CheckUserExists,
    CreateUser,
} from "@/database/services/auth/UserRegistration";
import { connectDB } from "@/lib/dbConnect";
import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest, NextResponse } from "next/server";

/*
    Get the required credentials from user
    Check if all fields/credentials are available
    If all fields are not present then send respective response

    Check if user with same email already exists
    If user exists with same email exists then send respective response

    If user doesnot exist then create new user
*/

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();
        const { username, email, password, role } =
            (await request.json()) as RegisterRouteBodyType;

        if (!username || !email || !password || !role)
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Missing fields!",
            });

        // Check if user already exists
        const userExists = await CheckUserExists(email);

        if (userExists)
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "User with same email already exists!",
            });

        // Create new user
        await CreateUser({ email, username, role, password });

        return API_RESPONSE(CREATED, {
            success: true,
            message: "Registration Successful!",
        });

        /*
            Todo : Add profile picture option
        */
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};
