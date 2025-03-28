import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";
import { EnrolledCourses } from "@/database/services/course/EnrolledCourses";
import { connectDB } from "@/lib/dbConnect";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";

/*
    Get studentId from params

    Get all the courses that the student is enrolled in
    If not found then send respective response
*/

export const GET = async (
    request: NextRequest,
    { params }: ParamsProp<{ studentId: string }>
) => {
    try {
        await connectDB();

        // Get the student id
        const { studentId } = await params;

        // Get all the courses
        const { success, message, courses } = await EnrolledCourses(studentId);

        if (!success) {
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
            });
        }

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
