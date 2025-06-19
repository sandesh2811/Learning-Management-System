import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    OK,
} from "@/constants/Constants";

import { DeleteCourse } from "@/database/services/course/DeleteCourse";

import { API_RESPONSE } from "@/utils/API_Response";

import { connectDB } from "@/lib/dbConnect";
import { withMiddleware } from "@/middlewares/withMiddleware";
import { CheckSession } from "@/middlewares/checkSession";
import { RateLimit } from "@/middlewares/rateLimit";

/*
    Get the user id from the request user object
    If no user id then send respective response
    Get the course id from the params
    If no course id then send respective response

    Find and delete the course based on course id
    If course deletion successful then send respective response
*/

const handler = async (
    request: CustomNextRequest,
    { params }: ParamsProp<{ courseId: string }>
) => {
    try {
        await connectDB();

        // Get user id from request object
        const userId = request.user.userId;

        if (!userId) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Invalid user id!",
            });
        }

        // Get course id from the request params
        const { courseId } = await params;

        if (!courseId) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Invalid course id!",
            });
        }

        // Delete the course
        const deletedCourse = await DeleteCourse({ courseId, userId });

        if (!deletedCourse) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Couldn't delete particular course!",
            });
        }

        return API_RESPONSE(OK, {
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

export const DELETE = withMiddleware([CheckSession, RateLimit], handler);
