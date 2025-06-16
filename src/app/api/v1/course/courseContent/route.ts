import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { getCourseContent } from "@/database/services/user/getCourseContent";

import { CheckSession } from "@/middlewares/checkSession";
import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { API_RESPONSE } from "@/utils/API_Response";

/**
 * Get the user id from the request attached by middleware
 * If there is no user id then send relevant response
 *
 * Get the course id from the params of the request
 * If there is no course id then send relevant response
 *
 * Get the course content from database
 * If there is no course content then send relevant response
 * If there is course content then send course content
 */

const handler = async (request: CustomNextRequest) => {
    // Get the userId from the request
    const userId = request.user.userId;

    if (!userId) {
        return API_RESPONSE<null>(BAD_REQUEST, {
            success: false,
            message: "Invalid userid!",
            data: null,
        });
    }

    // Get the search params of the request
    const params = request.nextUrl.searchParams;
    // Get the course id of the request
    const courseId = params.get("courseId");

    if (!courseId) {
        return API_RESPONSE<null>(BAD_REQUEST, {
            success: false,
            message: "Invalid course id!",
            data: null,
        });
    }

    try {
        // DB call to get course content
        const courseContent = await getCourseContent(courseId);

        // If course content is not found
        if (!courseContent) {
            return API_RESPONSE<null>(NOT_FOUND, {
                success: false,
                message: "Course content not found!",
                data: null,
            });
        }

        // If course content is found
        return API_RESPONSE<UserType>(OK, {
            success: true,
            message: "Course content!",
            data: courseContent,
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};

export const GET = withMiddleware([CheckSession, RateLimit], handler);
