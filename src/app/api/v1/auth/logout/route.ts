import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/Constants";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "@/constants/Constants";

import { API_RESPONSE } from "@/utils/API_Response";

import { cookies } from "next/headers";

/*
    Get cookies from next headers

    Check if both cookie exists
    If both of them are not available then send respective response
    If both or one of them is available then delete them from the cookie store
*/

export const GET = async () => {
    try {
        const access_token = (await cookies()).get("access_token");
        const refresh_token = (await cookies()).get("access_token");
        if (!access_token && !refresh_token) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Couldn't logout",
            });
        }

        (await cookies()).delete("access_token");
        (await cookies()).delete("refresh_token");

        return API_RESPONSE(OK, {
            success: true,
            message: "Logged out successfully!",
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};
