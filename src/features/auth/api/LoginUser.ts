"use server";

import { LoginType } from "@/validators/auth/LoginSchema";

import axios from "axios";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

export const LoginUser = async (
    _: unknown,
    data: LoginType
): Promise<ReturnState> => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/v1/auth/login",
            data
        );

        const cookieStore = await cookies();
        const cookieArray = setCookieParser(response.headers["set-cookie"]!);

        cookieArray.forEach((cookie) => {
            //@ts-expect-error we are not defining  properties individually rather spreading them so ts error is expected
            cookieStore.set(cookie.name, cookie.value, { ...cookie });
        });

        const { success, message, data: userInfo } = response.data;

        return {
            success,
            message,
            userInfo,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: error.response.data.success,
                message: error.response.data.message,
            };
        }

        return {
            success: false,
            message: "Internal Server Error!",
        };
    }
};
