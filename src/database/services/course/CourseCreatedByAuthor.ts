import { CACHE_KEYS, CACHE_TTLS } from "@/constants/Constants";

import { CourseCreatedByAuthor } from "./types/CourseCreatedByAuthor";

import { CourseModel } from "@/database/models/CourseModel";

import { cacheData, generateCacheKey, getCachedData } from "@/utils/redisCache";

import mongoose from "mongoose";

/**
 *  Get the author id and convert it to mongodb object id
 *
 *  Generate the cache key
 *  Get the data from cache. If data exists then send the respective data.
 *
 *  Query the database to get the required data
 *  Check if data is available. If yes then set in the cache and send the data
 *  If the data is not available then send empty array
 */

export const GetCoursesCreatedByAuthor = async (authorId: string) => {
    // Convert id to mongodb object id
    const id = new mongoose.Types.ObjectId(authorId);

    // Generate cache key
    const cacheKey = await generateCacheKey({
        baseKey: CACHE_KEYS.CREATED_COURSES_BY_AUTHOR,
        additionalKey: authorId,
    });

    // Get the data from cache
    const cachedData = await getCachedData(cacheKey);

    // Check if data is available in cache and if yes then return the cached data
    if (cachedData) {
        return { coursesCreatedByAuthor: cachedData };
    }

    // Get the necessary data from database
    const coursesCreatedByAuthor =
        await CourseModel.aggregate<CourseCreatedByAuthor>([
            { $match: { authorId: id } },
            {
                $project: {
                    title: 1,
                    duration: 1,
                    rating: 1,
                    createdAt: 1,
                    enrolledStudentsCount: { $size: "$enrolledStudents" },
                },
            },
        ]);

    if (coursesCreatedByAuthor.length !== 0) {
        // Set the data in cache
        await cacheData<CourseCreatedByAuthor[]>({
            cacheKey,
            data: coursesCreatedByAuthor,
            ttl: CACHE_TTLS.CREATED_COURSES_BY_AUTHOR,
        });

        return {
            coursesCreatedByAuthor,
        };
    }

    return {
        coursesCreatedByAuthor: [],
    };
};
