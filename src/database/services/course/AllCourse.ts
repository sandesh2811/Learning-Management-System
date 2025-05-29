import "server-only";

import { CACHE_KEYS, CACHE_TTLS, LIMIT } from "@/constants/Constants";

import { CourseModel } from "@/database/models/CourseModel";

import buildPipelineStage from "@/utils/buildPipelineStage";
import { cacheData, generateCacheKey, getCachedData } from "@/utils/redisCache";

/*
    Build aggregation pipeline based on filters (if provided)
    Get the courses based on the given pipeline
    If found then return courses along with next cursor needed for pagination
    If no courses are found return respective data
*/

export const GetAllCourses = async (
    filters: SearchParamsType & URLSearchParams
) => {
    // Build the pipeline
    const { pipeline, pageCursor } = buildPipelineStage({
        filters,
    });

    // Get cache key
    const cacheKey = await generateCacheKey({
        baseKey: CACHE_KEYS.COURSES,
        additionalKey: pageCursor,
    });

    // Check if the data is already cached
    const cachedData = await getCachedData(cacheKey);

    // Format this to take cursor and items from the cache
    if (cachedData) {
        return {
            success: true,
            message: "All Courses! From cache",
            nextCursor: cachedData.nextCursor,
            courses: cachedData.items,
        };
    }

    // Query the database
    const courses = await CourseModel.aggregate(pipeline);

    if (!courses)
        return {
            success: false,
            message: "Couldn't find courses!",
            nextCursor: undefined,
            courses: [],
        };

    // Check if there exists another page
    const hasNextPage = courses.length > LIMIT;

    // If there exists next page then set the courses upto second last index
    // If there doesn't then set the courses as it is
    const items = hasNextPage ? courses.slice(0, -1) : courses;

    // Set next cursor for pagination
    const nextCursor =
        courses.length > LIMIT
            ? {
                  id: items[items.length - 1]._id,
                  price: items[items.length - 1].price,
              }
            : undefined;

    const data = {
        items,
        nextCursor,
    };

    // ADD TYPESCRIPT
    // Set the data in cache
    await cacheData({ cacheKey, data, ttl: CACHE_TTLS.COURSES });

    return {
        success: true,
        message: "All Courses!",
        nextCursor,
        courses: items,
    };
};
