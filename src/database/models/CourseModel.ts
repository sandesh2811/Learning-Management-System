import mongoose, { Schema, Document, Model } from "mongoose";

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
    courseContent: string[];
    freebies: {
        isFreebie: boolean;
        file: string[];
    };
    coverImage: string;
    languagesAvailable: string[];
    enrolledStudents: Schema.Types.ObjectId[];
    tags: string[];
    rating: number;
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
            type: Array(String),
            default: [],
        },
        freebies: {
            isFreebie: {
                type: Boolean,
            },
            file: {
                type: Array(String),
                required: [true, "Atleast one free video is required!"],
            },
        },
        coverImage: {
            type: String,
            required: [true, "Cover image is required!"],
        },
        tags: {
            type: Array(String),
            required: [true, "Atleast one tag is required!"],
            default: [],
        },
        languagesAvailable: {
            type: Array(String),
            required: [true, "Course language is required!"],
        },
        enrolledStudents: {
            type: Array(Schema.Types.ObjectId),
            default: [],
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Indexes related to course
CourseSchema.index({ title: 1 });
CourseSchema.index({ rating: 1 });
CourseSchema.index({ price: 1, title: 1 });

export const CourseModel =
    (mongoose.models.Course as Model<CourseSchemaType>) ||
    mongoose.model<CourseSchemaType>("Course", CourseSchema);
