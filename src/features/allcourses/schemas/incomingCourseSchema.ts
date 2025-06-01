import { z } from "zod";

export const discountSchema = z.object({
    hasDiscount: z.boolean(),
    discountPercentage: z.number(),
});

const courseswithuserinfoSchema = z.object({
    fullname: z.string(),
});

export const CourseSchema = z.object({
    _id: z.string(),
    title: z.string(),
    price: z.number(),
    discount: discountSchema,
    coverImage: z.string(),
    tags: z.array(z.string()),
    rating: z.number(),
    courseswithuserinfo: courseswithuserinfoSchema,
});

export const CoursesSchema = z.array(CourseSchema);

export type CourseType = z.infer<typeof CourseSchema>;
