import "server-only";

import { CourseModel, CourseSchemaType } from "@/database/models/CourseModel";
import { cacheData, generateCacheKey, getCachedData } from "@/utils/redisCache";
import { CACHE_KEYS, CACHE_TTLS } from "@/constants/Constants";

/*
    Join two documents through userId
    Select respective data needed for the frontend 
    Filter the joined document based on rating
    Limit the result to 3

    Generate cache key and check if data exists in cache
    If data exists then send data from the cache
    If data doesn't exist then query database for featured courses

    If featured courses are found then cache and return featured courses
    If not found then send respective data
*/

type FeaturedCoursesServiceReturnType = BaseResponse & {
    featuredCourses: CourseSchemaType[];
};

// Build pipeline
const pipeline = [
    {
        $lookup: {
            // Document to join
            from: "users",
            // Field which helps to match documents
            localField: "authorId",
            // Field to which it is going to map
            foreignField: "_id",
            // New field name
            as: "courseswithuserinfo",
        },
    },
    { $unwind: "$courseswithuserinfo" },
    {
        $project: {
            courseswithuserinfo: {
                fullname: 1,
            },
            title: 1,
            price: 1,
            coverImage: 1,
            rating: 1,
            tags: 1,
            discount: 1,
        },
    },
    {
        $match: {
            rating: { $gte: 4.5 },
        },
    },
    { $limit: 3 },
];

export const FeaturedCourses =
    async (): Promise<FeaturedCoursesServiceReturnType> => {
        // Get the cache key
        const cacheKey = await generateCacheKey({
            baseKey: CACHE_KEYS.FEATURED_COURSES,
        });

        // Check if data exists in cache
        const data = await getCachedData(cacheKey);

        if (data) {
            return {
                success: true,
                message: "Featured courses based on ratings!",
                featuredCourses: data,
            };
        }

        // Query the database based on pipeline
        const featuredCourses = await CourseModel.aggregate(pipeline);

        if (!featuredCourses)
            return {
                success: false,
                message: "Couldn't find any featured courses!",
                featuredCourses: [],
            };

        // Set the data in cache
        await cacheData({
            cacheKey,
            data: featuredCourses,
            ttl: CACHE_TTLS.FEATURED_COURSES,
        });

        return {
            success: true,
            message: "Featured courses based on ratings!",
            featuredCourses,
        };
    };
