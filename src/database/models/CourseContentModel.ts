import mongoose, { Schema, Model, Document } from "mongoose";

type SingleContent = {
    title: string;
    description: string;
    video: string;
};

export interface CourseContent extends Document {
    freebies: {
        isFreebie: boolean;
        file: string[];
    };

    content: SingleContent[];
}

const CourseContentSchema = new Schema<CourseContent>({
    freebies: {
        isFreebie: {
            type: Boolean,
        },
        file: {
            type: Array(String),
            required: [true, "Atleast one free video is required!"],
        },
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
});

export const CourseContentModel =
    (mongoose.models.CourseContent as Model<CourseContent>) ||
    mongoose.model("courseContent", CourseContentSchema);
