import { z } from "zod";

const discountSchema = z.object({
    hasDiscount: z.boolean(),
    discountPercentage: z.number(),
});

const courseswithuserinfoSchema = z.object({
    fullname: z.string(),
});

// const freebiesSchema = z.object({
//     isFreebie: z.boolean(),
//     file: z.array(z.string()),
// });

// export const CourseSchema = z.object({
//     _id: z.string(),
//     authorId: z.string(),
//     title: z.string(),
//     description: z.string(),
//     price: z.number(),
//     duration: z.string(),
//     discount: discountSchema,
//     courseContent: z.array(z.string()),
//     freebies: freebiesSchema,
//     coverImage: z.string(),
//     tags: z.array(z.string()),
//     languagesAvailable: z.array(z.string()),
//     enrolledStudents: z.array(z.string()),
//     rating: z.number(),
// });

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
