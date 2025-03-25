import mongoose, { Schema, Document, Model } from "mongoose";

//Can add ratings too

export interface CourseSchemaType extends Document {
    authorId: Schema.Types.ObjectId;
    title: string;
    description: string;
    price: number;
    duration: number | string;
    discount: {
        hasDiscount: boolean;
        discountPercentage: number;
    };
    courseContent: Schema.Types.ObjectId[];
    freebies: {
        isFreebie: boolean;
        contentId: string[];
    };
    languagesAvailable: string | string[];
    enrolledStudents: Schema.Types.ObjectId[];
    tags: string[];
}

const CourseSchema = new Schema<CourseSchemaType>(
    {
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required!"],
        },
        title: {
            type: String,
            required: [true, "Course title is required!"],
        },
        description: {
            type: String,
            required: [true, "Course description is required!"],
        },
        price: {
            type: Number,
            required: [true, "Price of course is required!"],
            default: 0,
        },
        duration: {
            type: String || Number,
            required: [true, "Course duration is required!"],
        },
        discount: {
            hasDiscount: {
                type: Boolean,
            },
            discountPercentage: {
                type: Number,
                default: 0,
            },
        },
        courseContent: {
            type: Array(Schema.Types.ObjectId),
            default: [],
        },
        freebies: {
            isFreebie: {
                type: Boolean,
            },
            contentId: {
                type: Array(String),
                required: [true, "Atleast one free video is required!"],
            },
        },
        tags: {
            type: Array(String),
            required: [true, "Tag is required!"],
            default: [],
        },
        languagesAvailable: {
            type: String || Array(String),
            required: [true, "Course language is required!"],
        },
        enrolledStudents: {
            type: Array(Schema.Types.ObjectId),
            default: [],
        },
    },
    { timestamps: true }
);

export const CourseModel =
    (mongoose.models.Course as Model<CourseSchemaType>) ||
    mongoose.model<CourseSchemaType>("Course", CourseSchema);
