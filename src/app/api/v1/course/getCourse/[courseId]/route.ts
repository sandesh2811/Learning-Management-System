import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { CheckCourseExists } from "@/database/services/course/CourseExists";
import { connectDB } from "@/lib/dbConnect";
import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";

/*
    Get course id from the params

    Search if course exists 
    If course doesnot exists then send respective response
    If course exists then send course 
*/

const handler = async (
    req: NextRequest,
    { params }: ParamsProp<{ courseId: string }>
) => {
    try {
        await connectDB();

        // Get the course id
        const { courseId } = await params;

        // Check if course exists and get the course
        const { success, message, data } = await CheckCourseExists(courseId);

        if (!success) {
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
            });
        }

        return API_RESPONSE(OK, {
            success,
            message,
            data,
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
