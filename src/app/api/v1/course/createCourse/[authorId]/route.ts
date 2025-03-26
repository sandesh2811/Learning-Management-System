import {
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
} from "@/constants/Constants";

import { CreateCourse } from "@/database/services/course/CreateCourse";
import CreateCourseSchema from "@/validators/course/CreateCourseSchema";

import { connectDB } from "@/lib/dbConnect";

import { API_RESPONSE } from "@/utils/API_Response";
import { ConvertFormData } from "@/utils/formDataConversion";

import { NextRequest } from "next/server";
import { ZodError } from "zod";

/*
    Get all the fields from request 
    If required field are not available then send respective response

    If all fields are present then validate user sent data
    If validation fails then send respective response

    If validation passess then create the course
    Send respective response to the user
*/

export const POST = async (
    request: NextRequest,
    { params }: { params: Promise<{ authorId: string }> }
) => {
    try {
        await connectDB();

        const { authorId } = await params;
        const userSentData = await request.formData();

        // Convert formdata to object
        const {
            title,
            description,
            price,
            discount,
            duration,
            freebies,
            languagesAvailable,
            tags,
        } = ConvertFormData<Partial<CourseType>>(userSentData);

        // Check required fields presence
        if (
            !authorId &&
            !title &&
            !description &&
            !duration &&
            !languagesAvailable &&
            !freebies &&
            !price &&
            !tags
        )
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Missing fields!",
            });

        // Validate user sent data
        const validatedData = await CreateCourseSchema.parseAsync({
            authorId,
            title,
            description,
            price: price,
            duration,
            discount: {
                hasDiscount: discount?.hasDiscount,
                discountPercentage: discount?.discountPercentage,
            },
            freebies: {
                isFreebie: freebies?.isFreebie,
                file: freebies?.file,
            },
            tags,
            languagesAvailable,
        });

        /* Todo : Add video uploads and get the url of the uploaded videos */

        // Store valid data in an object
        const courseCreationValidData: Omit<
            CourseType,
            "courseContent" | "enrolledStudents"
        > = {
            authorId: authorId,
            title: validatedData.title,
            description: validatedData.description,
            price: validatedData.price,
            discount: {
                hasDiscount: validatedData.discount?.hasDiscount ?? false,
                discountPercentage:
                    validatedData.discount?.discountPercentage ?? 0,
            },
            duration: validatedData.duration,
            freebies: {
                isFreebie: validatedData.freebies.isFreebie,
                file: validatedData.freebies.file,
            },
            languagesAvailable: validatedData.languagesAvailable,
            tags: validatedData.tags,
        };

        // Create course
        const { success, message } = await CreateCourse(
            courseCreationValidData
        );

        if (!success)
            return API_RESPONSE(BAD_REQUEST, {
                success,
                message,
            });

        return API_RESPONSE(CREATED, {
            success,
            message,
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
            error: error,
        });
    }
};
