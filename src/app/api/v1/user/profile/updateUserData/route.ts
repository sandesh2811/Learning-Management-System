import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    NOT_FOUND,
    OK,
} from "@/constants/Constants";

import { getUserById } from "@/database/services/user/GetUserById";
import { updateUserProfileData } from "@/database/services/user/UpdateUserProfileData";
import UpdateProfileSchema, {
    UpdateProfileType,
} from "@/features/user/schemas/updateProfileSchema";

import { CheckSession } from "@/middlewares/checkSession";
import { RateLimit } from "@/middlewares/rateLimit";
import { withMiddleware } from "@/middlewares/withMiddleware";

import { API_RESPONSE } from "@/utils/API_Response";
import { ConvertFormData } from "@/utils/formDataConversion";

/*
 * Get the form data sent from the frontend
 * Convert the form data into simple object
 *
 * Check if all required and non required fields are available or not
 * If all required fields are not present then send respective response
 * If all fields are available then validate them
 *
 * Find the user based on user id
 * If user doesn't exist then send respective response
 * If user exists then update the previous data with current available data
 * If success then send respective response
 */

export type ChangedDataType = {
    username?: string;
    fullname?: string;
    about?: string;
    title?: string;
    email?: string;
    address?: string;
    contactNumber?: string;
};

const handler = async (request: CustomNextRequest) => {
    try {
        // Get user sent form data
        const formData = await request.formData();

        // Get the user id from the request which is attached by middleware
        const { userId } = request.user;

        // Convert form data
        const {
            username,
            fullname,
            email,
            title,
            about,
            address,
            contactNumber,
        } = ConvertFormData<UpdateProfileType>(formData);

        // Check if required fields are present or not
        if (!username || !email || !fullname || !title || !about)
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Missing fields!",
            });

        const userSentData = {
            username,
            fullname,
            email,
            title,
            about,
            address,
            contactNumber,
        };

        // Validating incoming data
        const validData = await UpdateProfileSchema.parseAsync(userSentData);

        if (!validData)
            return API_RESPONSE(BAD_REQUEST, {
                success: false,
                message: "Data validation failed!",
            });

        // Get user by id
        const user = await getUserById(userId);

        if (!user) {
            return API_RESPONSE(NOT_FOUND, {
                success: false,
                message: "User not found!",
            });
        }

        // To store the data that have been changed
        const changedData: ChangedDataType = {};

        // Checking if values are changed or not
        if (user.username.toLowerCase() !== username.toLowerCase())
            changedData.username = username;

        if (user.fullname.toLowerCase() !== fullname.toLowerCase())
            changedData.fullname = fullname;

        if (user.title.toLowerCase() !== title.toLowerCase())
            changedData.title = title;

        if (user.about.toLowerCase() !== about.toLowerCase())
            changedData.about = about;

        if (user.email.toLowerCase() !== email.toLowerCase())
            changedData.email = email;

        if (typeof address === "string" && address.length !== 0) {
            if (user.address.toLowerCase() !== address.toLowerCase())
                changedData.address = address;
        }

        if (typeof contactNumber === "string" && contactNumber.length !== 0) {
            if (
                user.contactNumber.toLowerCase() !== contactNumber.toLowerCase()
            )
                changedData.contactNumber = contactNumber;
        }

        // Update the previous data with new data
        const isSuccess = await updateUserProfileData({ userId, changedData });

        if (!isSuccess) {
            return API_RESPONSE(OK, {
                success: false,
                message: "Couldn't update user data!",
            });
        }

        return API_RESPONSE(OK, {
            success: true,
            message: "Profile data updated!",
        });
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};

export const POST = withMiddleware([CheckSession, RateLimit], handler);
