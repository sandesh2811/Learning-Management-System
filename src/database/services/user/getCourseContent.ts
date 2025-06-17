import { CourseModel } from "@/database/models/CourseModel";

import mongoose from "mongoose";

/**
 * Get the course id
 * Convert the course id into mongodb object id
 *
 * Join the course content document and the course document
 * Extract only the relevant course content data
 *
 * If course content is not found then return null else return the course content
 */

export const getCourseContent = async (courseId: string) => {
    const id = new mongoose.Types.ObjectId(courseId);

    const courseContent = await CourseModel.aggregate([
        { $match: { _id: id } },
        {
            $lookup: {
                from: "courseContents",
                foreignField: "_id",
                localField: "courseContent",
                as: "coursewithcontent",
            },
        },

        {
            $project: {
                _id: 0,
                courseContent: {
                    $map: {
                        input: "$coursewithcontent",
                        in: {
                            _id: "$$this._id",
                            title: "$$this.content.title",
                            description: "$$this.content.description",
                            video: "$$this.content.video",
                        },
                    },
                },
            },
        },
    ]);

    if (!courseContent) return null;

    return courseContent[0].courseContent;
};
