"use server";

import { CACHE_KEYS, CACHE_TTLS } from "@/constants/Constants";

import { CourseModel } from "@/database/models/CourseModel";

import { cacheData, generateCacheKey, getCachedData } from "@/utils/redisCache";

import mongoose from "mongoose";

/**
 * Get the course id
 *
 * Generate the cache key
 * Check if data exists in cache
 * If yes then send the cached data
 *
 * Else query database to get relevant data for course
 * If course data is not found then return null
 * If course data is found then set the data in cache
 * Return the course data
 */

export type CourseToUpdate = Omit<
    CourseType,
    "rating" | "enrolledStudents" | "authorId"
>;

export const getSingleCourseToUpdate = async (
    courseId: string
): Promise<CourseToUpdate | null> => {
    // Get the cache key
    const cacheKey = await generateCacheKey({
        baseKey: CACHE_KEYS.COURSE_TO_UPDATE,
        additionalKey: courseId,
    });

    // Check if data exists in cache
    const cachedData = await getCachedData(cacheKey);

    if (cachedData) return cachedData;

    // Find course with course id by builiding pipeline
    const course = await CourseModel.aggregate<CourseToUpdate>([
        { $match: { _id: new mongoose.Types.ObjectId(courseId) } },

        {
            $lookup: {
                from: "courseContents",
                localField: "courseContent",
                foreignField: "_id",
                as: "coursewithcontent",
            },
        },

        {
            $project: {
                title: 1,
                description: 1,
                price: 1,
                discount: 1,
                languagesAvailable: 1,
                duration: 1,
                freebies: 1,
                courseTags: 1,
                coverImage: 1,
                tags: 1,

                courseContent: {
                    $map: {
                        input: "$coursewithcontent",
                        in: {
                            isFreebie: "$$this.isFreebie",
                            title: "$$this.content.title",
                            description: "$$this.content.description",
                            video: "$$this.content.video",
                        },
                    },
                },
            },
        },
    ]);

    if (!course) return null;

    // Set data in cache
    await cacheData<CourseToUpdate>({
        cacheKey,
        data: course[0],
        ttl: CACHE_TTLS.COURSE_TO_UPDATE,
    });

    return course[0];
};
