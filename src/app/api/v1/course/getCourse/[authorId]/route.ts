import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { GetCoursesCreatedByAuthor } from "@/database/services/course/CourseCreatedByAuthor";
import { connectDB } from "@/lib/dbConnect";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";

/*
    Get the authorId from params
    
    Find all the courses made by the author in course model
    Send the response based on the query result
*/

export const GET = async (
    request: NextRequest,
    { params }: ParamsProp<{ authorId: string }>
) => {
    try {
        await connectDB();

        // Get author id from params
        const { authorId } = await params;

        // Get courses made by the author
        const { success, message, coursesCreatedByAuthor } =
            await GetCoursesCreatedByAuthor(authorId);

        if (!success)
            return API_RESPONSE(NOT_FOUND, {
                success,
                message,
                data: coursesCreatedByAuthor,
            });

        return API_RESPONSE(OK, {
            success,
            message,
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
