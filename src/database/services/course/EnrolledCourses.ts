import { CACHE_KEYS, CACHE_TTLS } from "@/constants/Constants";

import { OrderModel } from "@/database/models/OrderModel";

import { cacheData, generateCacheKey, getCachedData } from "@/utils/redisCache";

import mongoose from "mongoose";

/**
 *  Get the student id and convert it to mongodb object id
 *
 *  Generate the cache key and check if data already exists in cache
 *  If data exists in cache then return the data
 *
 *  If data doesnot exist in cache then find the relevant data in db
 *  Set the data in cache
 *
 *  If data is not found then return null
 *  If data is found then send the data
 */

export type EnrolledCoursesType = {
    course: {
        _id: string;
        title: string;
    };
    createdAt: string;
};

export const EnrolledCourses = async (
    studentId: string
): Promise<EnrolledCoursesType[] | null> => {
    // Convert string id to object id
    const id = new mongoose.Types.ObjectId(studentId);

    // Generate cache key
    const cacheKey = await generateCacheKey({
        baseKey: CACHE_KEYS.ENROLLED_COURSES,
        additionalKey: studentId,
    });

    // Check if data exists in cache
    const cachedData = await getCachedData(cacheKey);

    // If data exists in cache then return the data
    if (cachedData) {
        return cachedData;
    }

    const purchasedCourses = await OrderModel.aggregate<EnrolledCoursesType>([
        {
            $match: {
                customerId: id,
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "userpurchasedcourses",
            },
        },
        {
            $unwind: "$userpurchasedcourses",
        },
        {
            $project: {
                _id: 0,
                createdAt: 1,
                course: {
                    _id: "$userpurchasedcourses._id",
                    title: "$userpurchasedcourses.title",
                },
            },
        },
    ]);

    // Set data in cache
    await cacheData<EnrolledCoursesType[]>({
        cacheKey,
        data: purchasedCourses,
        ttl: CACHE_TTLS.ENROLLED_COURSES,
    });

    if (!purchasedCourses) return null;

    return purchasedCourses;
};
