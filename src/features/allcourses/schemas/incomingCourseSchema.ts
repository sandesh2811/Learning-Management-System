import { z } from "zod";

const discountSchema = z.object({
    hasDiscount: z.boolean(),
    discountPercentage: z.number(),
});

const freebiesSchema = z.object({
    isFreebie: z.boolean(),
    file: z.array(z.string()),
});

const CourseSchema = z.object({
    _id: z.string(),
    authorId: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.string(),
    discount: discountSchema,
    courseContent: z.array(z.string()),
    freebies: freebiesSchema,
    coverImage: z.string(),
    tags: z.array(z.string()),
    languagesAvailable: z.array(z.string()),
    enrolledStudents: z.array(z.string()),
    rating: z.number(),
});

export const CoursesSchema = z.array(CourseSchema);

export type CourseType = z.infer<typeof CourseSchema>;
