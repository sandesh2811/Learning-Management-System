import mongoose, { Schema, Model, Document } from "mongoose";

type SingleContent = {
    title: string;
    description: string;
    video: string;
};

export interface CourseContent extends Document {
    isFreebie: boolean;
    content: SingleContent;
}

const CourseContentSchema = new Schema<CourseContent>(
    {
        isFreebie: {
            type: Boolean,
            required: [true, "Freebie status is required!"],
        },

        content: {
            title: {
                type: String,
                required: [true, "Title is required!"],
            },
            description: {
                type: String,
                required: [true, "Description is required!"],
            },

            video: {
                type: String,
                required: [true, "Video is required!"],
            },
        },
    },
    { timestamps: true }
);

export const CourseContentModel =
    (mongoose.models.CourseContent as Model<CourseContent>) ||
    mongoose.model("courseContent", CourseContentSchema);
