import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { CheckCourseExists } from "@/database/services/course/CourseExists";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";

/*
    Get course id from the params

    Search if course exists 
    If course doesnot exists then send respective response
    If course exists then send course 
*/

export const GET = async (
    req: NextRequest,
    { params }: ParamsProp<{ courseId: string }>
) => {
    try {
        // Get the course id
        const { courseId } = await params;

        // Check if course exists
        const { success, message, course } = await CheckCourseExists(courseId);

        if (!success) {
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
            });
        }

        return API_RESPONSE(OK, {
            success,
            message,
            data: course,
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};
