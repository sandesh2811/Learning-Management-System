import "server-only";

import { CourseModel, CourseSchemaType } from "@/database/models/CourseModel";

type FeaturedCoursesServiceReturnType = BaseResponse & {
    featuredCourses: CourseSchemaType[];
};

/*
    Join two documents through userId
    Select respective data needed for the frontend 
    Filter the joined document based on rating
    Limit the result to 3

    If featured courses are found then return featured courses
    If not found then send respective data
*/

export const FeaturedCourses =
    async (): Promise<FeaturedCoursesServiceReturnType> => {
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

        // Query the database based on pipeline
        const featuredCourses = await CourseModel.aggregate(pipeline);

        if (!featuredCourses)
            return {
                success: false,
                message: "Couldn't find any featured courses!",
                featuredCourses: [],
            };

        return {
            success: true,
            message: "Featured courses based on ratings!",
            featuredCourses,
        };
    };
