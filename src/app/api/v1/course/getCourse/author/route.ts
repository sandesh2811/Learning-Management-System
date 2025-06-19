import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { CourseCreatedByAuthor } from "@/database/services/course/types/CourseCreatedByAuthor";

import { GetCoursesCreatedByAuthor } from "@/database/services/course/CourseCreatedByAuthor";

import { CheckSession } from "@/middlewares/checkSession";
import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { connectDB } from "@/lib/dbConnect";
import { API_RESPONSE } from "@/utils/API_Response";

/*
    Get the author id from the request user object
    Check if author id is available or not
    If not then send respective response
    
    Find all the courses made by the author in course model
    Send the response based on the query result
*/

const handler = async (request: CustomNextRequest) => {
    try {
        await connectDB();

        // Get the author id from the request user object
        const authorId = request.user.userId;

        if (!authorId) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Invalid author id!",
                data: [],
            });
        }

        // Get courses made by the author
        const { coursesCreatedByAuthor } =
            await GetCoursesCreatedByAuthor(authorId);

        if (!coursesCreatedByAuthor)
            return API_RESPONSE(NOT_FOUND, {
                success: false,
                message: "Couldn't find courses!",
                data: coursesCreatedByAuthor,
            });

        return API_RESPONSE<CourseCreatedByAuthor[]>(OK, {
            success: true,
            message: "Courses made by author!",
            data: coursesCreatedByAuthor,
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
