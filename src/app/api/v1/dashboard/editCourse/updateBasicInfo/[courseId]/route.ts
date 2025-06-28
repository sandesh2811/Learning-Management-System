import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    OK,
} from "@/constants/Constants";

import { updateCourseBasicInfo } from "@/database/services/dashboard/editCourse/updateCourseBasicInfo";
import { BasicInfoUpdateSchema } from "@/features/dashboard/editCourse/schemas/basicInfoUpdateScehma";

import { CheckSession } from "@/middlewares/checkSession";
import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { API_RESPONSE } from "@/utils/API_Response";

import { ZodError } from "zod";

/*
    Get the course id from params
    Get the user sent data from request body
    If course id is not available then send respective response
    If user sent data is not available then send respective response

    Validate the user sent data
    Update the course
    If course updation successful then send respective response and vice versa
*/

const handler = async (
    request: CustomNextRequest,
    { params }: ParamsProp<{ courseId: string }>
) => {
    try {
        // Get the user id
        const { userId } = request.user;

        // Get the course id
        const { courseId } = await params;

        // Get the user sent data
        const data = await request.json();

        if (!courseId) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Invalid course id!",
            });
        }

        if (!data || Object.keys(data).length === 0) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Invalid data!",
            });
        }

        // Validate the user sent data
        const validData =
            await BasicInfoUpdateSchema.partial().parseAsync(data);

        // Update the course
        const updatedCourseInfo = await updateCourseBasicInfo({
            courseId,
            userId,
            dataToBeUpdated: validData,
        });

        if (!updatedCourseInfo) {
            return API_RESPONSE(BAD_REQUEST, {
                success: true,
                message: "Couldn't update course!",
            });
        }

        return API_RESPONSE(OK, {
            success: true,
            message: "Course updated successfully!",
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: error.errors[0].message,
            });
        }

        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};

export const PATCH = withMiddleware([CheckSession, RateLimit], handler);
