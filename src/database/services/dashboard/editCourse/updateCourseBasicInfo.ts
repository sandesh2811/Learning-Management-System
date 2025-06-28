import { CACHE_KEYS } from "@/constants/Constants";

import { type BasicInfoUpdateType } from "@/features/dashboard/editCourse/schemas/basicInfoUpdateScehma";

import { CourseModel, CourseSchemaType } from "@/database/models/CourseModel";

import { redisClient } from "@/lib/redis";
import { generateCacheKey } from "@/utils/redisCache";

/*
    Get the course id and data to be updated 
    Find the course based on course id and update
    If course updation successful then delete the relevant data from cache and return the updated course
    Else return null
*/

type UpdateCourseBasicInfoArgs = {
    courseId: string;
    userId: string;
    dataToBeUpdated: Partial<BasicInfoUpdateType>;
};

export const updateCourseBasicInfo = async ({
    courseId,
    userId,
    dataToBeUpdated,
}: UpdateCourseBasicInfoArgs): Promise<CourseSchemaType | null> => {
    const updatedCourseInfo = await CourseModel.findByIdAndUpdate(
        { _id: courseId },
        { $set: dataToBeUpdated },
        { new: true }
    );

    if (!updatedCourseInfo) return null;

    /* Generate the cache key for course to be updated */
    const cacheKeyForCourseToBeUpdated = await generateCacheKey({
        baseKey: CACHE_KEYS.COURSE_TO_UPDATE,
        additionalKey: courseId,
    });

    /* Delete the single course (needed to update) which is stored from the cache */
    redisClient.del(cacheKeyForCourseToBeUpdated);

    /* Generate the cache key for courses made by the user */
    const cacheKeyForUserCreatedCourses = await generateCacheKey({
        baseKey: CACHE_KEYS.CREATED_COURSES_BY_AUTHOR,
        additionalKey: userId,
    });

    /* Delete the user created courses from the cache */
    redisClient.del(cacheKeyForUserCreatedCourses);

    return updatedCourseInfo;
};
