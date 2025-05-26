import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { GetAllCourses } from "@/database/services/course/AllCourse";

import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { API_RESPONSE } from "@/utils/API_Response";

import { connectDB } from "@/lib/dbConnect";

import { NextRequest } from "next/server";

/*
    Query to get courses from the database
    If no courses are found then send respective response
    If found then send respective response
*/

export const handler = async (request: NextRequest) => {
    const filters = request.nextUrl.searchParams as SearchParamsType &
        URLSearchParams;

    try {
        await connectDB();

        const { success, message, courses, nextCursor } =
            await GetAllCourses(filters);

        if (!success)
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
                data: courses,
            });

        return API_RESPONSE(OK, {
            success,
            message,
            data: courses,
            nextPage: nextCursor,
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};

export const GET = withMiddleware([RateLimit], handler);
