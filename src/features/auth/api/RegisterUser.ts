"use server";

import { RegisterType } from "@/validators/auth/RegisterSchema";

import axios from "axios";

export const RegisterUser = async (
    _: unknown,
    data: RegisterType
): Promise<ReturnState> => {
    try {
        const formData = new FormData();

        /* Convert the incoming json data to form data */
        Object.entries(data).forEach(([key, value]) => {
            if (key === "avatar") {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        });

        const response = await axios.post(
            "http://localhost:3000/api/v1/auth/register",
            formData
        );

        const { success, message } = response.data;

        return {
            success,
            message,
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
