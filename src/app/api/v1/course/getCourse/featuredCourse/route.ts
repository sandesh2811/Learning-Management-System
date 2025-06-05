import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { FeaturedCourses } from "@/database/services/course/FeaturedCourse";

import { SelectiveCourseDetails } from "@/database/services/course/types/GetAllCourses";

import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { API_RESPONSE } from "@/utils/API_Response";

import { connectDB } from "@/lib/dbConnect";

import { NextRequest } from "next/server";

/*
    Get all the featured courses based on rating
    If featured courses are not found then send respective response
    If featured courses are found then send featured courses along with respective response
*/

const handler = async (request: NextRequest) => {
    try {
        await connectDB();

        const { success, message, featuredCourses } = await FeaturedCourses();

        if (!success) {
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
            });
        }

        return API_RESPONSE<SelectiveCourseDetails[]>(OK, {
            success,
            message,
            data: featuredCourses,
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
