import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { GetUserProfileData } from "@/database/services/user/GetUserProfileData";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";

/*
 * Get the username from the request params
 * If no username found then send respective response
 *
 * If username is valid then
 * Check if  user exists with that username (username is unique so we can query using username)
 *
 * If user exists then send user data except password
 * If user doesnot exist then send appropiate response
 */

export const GET = async (request: NextRequest) => {
    // Get all the params
    const params = request.nextUrl.searchParams;

    // Get the username from the params
    // If username is null then assign empty string
    const username = params.get("username");

    if (!username || typeof username !== "string") {
        return API_RESPONSE<null>(BAD_REQUEST, {
            success: false,
            message: "Invalid username!",
            data: null,
        });
    }

    try {
        // DB call to get user
        const user = await GetUserProfileData(username);

        // If user not found
        if (!user) {
            return API_RESPONSE<null>(NOT_FOUND, {
                success: false,
                message: "User not found!",
                data: null,
            });
        }

        // If user found
        return API_RESPONSE<UserType>(OK, {
            success: true,
            message: "User found!",
            data: user,
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};
