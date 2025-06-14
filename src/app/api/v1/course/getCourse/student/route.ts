import { type EnrolledCoursesType } from "@/database/services/course/EnrolledCourses";

import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { EnrolledCourses } from "@/database/services/course/EnrolledCourses";

import { CheckSession } from "@/middlewares/checkSession";
import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { connectDB } from "@/lib/dbConnect";

import { API_RESPONSE } from "@/utils/API_Response";

/*
    Get student id from the user object attached from middleware

    Get all the courses that the student is enrolled in
    If not found then send respective response
*/

const handler = async (request: CustomNextRequest) => {
    try {
        await connectDB();

        // Getting student id from the user object attached by middleware
        const studentId = request.user.userId;

        //Make an id check and send response
        if (!studentId) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Invalid student id!",
            });
        }

        // Get all the courses based on student id
        const purchasedCourses = await EnrolledCourses(studentId);

        if (!purchasedCourses) {
            return API_RESPONSE(NOT_FOUND, {
                success: false,
                message: "Couldn't find any courses enrolled by student!",
            });
        }

        return API_RESPONSE<EnrolledCoursesType[]>(OK, {
            success: true,
            message: "Courses enrolled by student!",
            data: purchasedCourses,
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};

export const GET = withMiddleware([CheckSession, RateLimit], handler);
