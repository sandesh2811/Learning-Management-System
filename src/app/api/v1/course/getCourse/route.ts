import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";
import { GetAllCourses } from "@/database/services/course/AllCourse";
import { connectDB } from "@/lib/dbConnect";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";

/*
    Query to get courses from the database
    If no course are found then send respective response
    If found then send respective response
*/

export const GET = async (request: NextRequest) => {
    /*
        Todo : Add filters and pagination 
    */

    try {
        await connectDB();

        const { success, message, courses } = await GetAllCourses();

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
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};
