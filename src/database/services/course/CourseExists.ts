import "server-only";

import { CACHE_KEYS, CACHE_TTLS } from "@/constants/Constants";

import { CourseModel } from "@/database/models/CourseModel";

import { cacheData, generateCacheKey, getCachedData } from "@/utils/redisCache";

import mongoose from "mongoose";

/*
    Find relevant course with course id
    Join the user document and course content document to get a single course with user and course content info

    Find relevant courses based on user id and return only 3 based on rating
*/

export const CheckCourseExists = async (courseId: string) => {
    // Get the cache key
    const cacheKey = await generateCacheKey({
        baseKey: CACHE_KEYS.SINGLE_COURSE,
        additionalKey: courseId,
    });

    // Check if data exists in cache
    const cachedData = await getCachedData(cacheKey);

    if (cachedData) {
        return {
            success: true,
            message: "Course exists!",
            data: cachedData,
        };
    }

    // Find course with course id by builiding pipeline
    const course = await CourseModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
        {
            $lookup: {
                from: "users",
                localField: "authorId",
                foreignField: "_id",
                as: "coursewithuserinfo",
            },
        },
        { $unwind: "$coursewithuserinfo" },
        {
            $lookup: {
                from: "courseContents",
                localField: "courseContentId",
                foreignField: "_id",
                as: "coursewithcontent",
            },
        },
        { $unwind: "$coursewithcontent" },
        {
            $project: {
                title: 1,
                description: 1,
                price: 1,
                rating: 1,
                discount: 1,
                languagesAvailable: 1,
                duration: 1,
                enrolledStudents: 1,
                freebies: 1,
                instructorInfo: {
                    _id: "$coursewithuserinfo._id",
                    fullname: "$coursewithuserinfo.fullname",
                    email: "$coursewithuserinfo.email",
                    avatar: "$coursewithuserinfo.avatar",
                    about: "$coursewithuserinfo.about",
                },
                // Need to make adjustments
                courseContent: {
                    test: "$coursewithcontent.test",
                },
            },
        },
    ]);

    // Find relevant courses
    const relatedCourses = await CourseModel.find({
        authorId: course[0].instructorInfo._id,
        rating: { $gte: 4 },
        _id: { $ne: course[0]._id },
    })
        .limit(3)
        .select("title");

    const data = {
        course: course[0],
        relatedCourses: relatedCourses,
    };

    // Set data in cache
    await cacheData({ cacheKey, data, ttl: CACHE_TTLS.SINGLE_COURSE });

    if (!course)
        return {
            success: false,
            message: "Couldn't find particular course!",
            data: {},
        };

    return {
        success: true,
        message: "Course exists!",
        data,
    };
};
