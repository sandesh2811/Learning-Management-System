import { discountSchema } from "@/features/allcourses/schemas/incomingCourseSchema";

import { z } from "zod";

const freebiesSchema = z.object({
    isFreebie: z.boolean(),
    file: z.array(z.string()),
});

export const SingleCourseSchema = z.object({
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

export type SingleCourseType = z.infer<typeof SingleCourseSchema>;
