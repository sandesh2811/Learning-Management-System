import { CACHE_KEYS } from "@/constants/Constants";
import {
    CourseModel,
    type CourseSchemaType,
} from "@/database/models/CourseModel";
import { deleteCachedData, generateCacheKey } from "@/utils/redisCache";

import mongoose from "mongoose";

/**
 *  Get the user and course id
 *  Convert the course id and user id to mongodb object id
 *  Find and delete the course based on course id and the owner (only the owner of the course can delete the course)
 *
 * Invalidate the redis cache for the user created courses
 */

type DeleteCourseArgs = {
    courseId: string;
    userId: string;
};

export const DeleteCourse = async ({
    courseId,
    userId,
}: DeleteCourseArgs): Promise<CourseSchemaType | null> => {
    // Convert to mongo db object id
    const id = new mongoose.Types.ObjectId(courseId);
    const ownerId = new mongoose.Types.ObjectId(userId);

    const isDeleteSuccessful = await CourseModel.findByIdAndDelete({
        _id: id,
        owner: ownerId,
    });

    if (isDeleteSuccessful) {
        // Generate cache key of exact type
        const cacheKey = await generateCacheKey({
            baseKey: CACHE_KEYS.CREATED_COURSES_BY_AUTHOR,
            additionalKey: userId,
        });

        // Delete data from cache
        await deleteCachedData(cacheKey);
    }

    return isDeleteSuccessful;
};
