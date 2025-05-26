import "server-only";

import { LIMIT } from "@/constants/Constants";

import { CourseModel } from "@/database/models/CourseModel";

import buildPipelineStage from "@/utils/buildPipelineStage";

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
    const { pipeline } = buildPipelineStage({
        filters,
    });

    // Query the database
    const courses = await CourseModel.aggregate(pipeline);

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

    if (courses.length !== 0)
        return {
            success: true,
            message: "All Courses!",
            nextCursor,
            courses: items,
        };

    return {
        success: false,
        message: "Couldn't find courses!",
        courses: [],
    };
};
