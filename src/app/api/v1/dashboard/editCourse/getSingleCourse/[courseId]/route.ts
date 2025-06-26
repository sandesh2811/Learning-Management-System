import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import {
    type CourseToUpdate,
    getSingleCourseToUpdate,
} from "@/database/services/dashboard/editCourse/getSingleCourseToUpdate";

import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { API_RESPONSE } from "@/utils/API_Response";

import { connectDB } from "@/lib/dbConnect";

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

        if (!courseId) {
            return API_RESPONSE(NOT_FOUND, {
                success: false,
                message: "Invalid course id!",
            });
        }

        // Check if course exists and get the course
        const data = await getSingleCourseToUpdate(courseId);

        if (!data) {
            return API_RESPONSE(NOT_FOUND, {
                success: false,
                message: "Couldn't find particular course!",
                data: undefined,
            });
        }

        return API_RESPONSE<CourseToUpdate>(OK, {
            success: true,
            message: "Single course to edit!",
            data,
        });
    } catch (error) {
        console.log(error);

        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: error,
        });
    }
};

export const GET = withMiddleware([RateLimit], handler);
