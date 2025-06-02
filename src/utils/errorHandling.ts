import { ZodError } from "zod";

import axios from "axios";

export const HandleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(
            JSON.stringify({
                statusCode: error.response.status,
                success: error.response.data.success,
                message: error.response.data.message,
            })
        );
    } else if (error instanceof ZodError) {
        throw new Error(
            JSON.stringify({
                success: false,
                message: "Data validation failed! Please try again later.",
            })
        );
    } else {
        throw new Error(
            JSON.stringify({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Oops! Something went wrong.",
            })
        );
    }
};
