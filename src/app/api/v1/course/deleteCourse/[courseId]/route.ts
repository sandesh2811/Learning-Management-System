import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NO_CONTENT,
    NOT_FOUND,
} from "@/constants/Constants";

import { DeleteCourse } from "@/database/services/course/DeleteCourse";
import { CheckCourseExists } from "@/database/services/course/CourseExists";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/dbConnect";

/*
    Get the course id from the params

    Search if the course exists
    If not then send respective response
    If exists then delete the course and send respective response
*/

export const DELETE = async (
    request: NextRequest,
    { params }: ParamsProp<{ courseId: string }>
) => {
    try {
        await connectDB();

        const { courseId } = await params;

        // Check if course exists
        const { success, message } = await CheckCourseExists(courseId);

        if (!success) {
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
            });
        }

        // Delete the course
        const acknowledged = await DeleteCourse(courseId);

        if (!acknowledged) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Couldn't delete particular course!",
            });
        }

        return API_RESPONSE(NO_CONTENT, {
            success: true,
            message: "Course deleted successfully!",
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};
