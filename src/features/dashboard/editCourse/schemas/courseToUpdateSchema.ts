import { z } from "zod";

export const CourseToUpdateSchema = z
    .object({
        _id: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        duration: z.string(),
        discount: z.object({
            hasDiscount: z.boolean(),
            discountPercentage: z.number(),
        }),
        freebies: z.object({
            isFreebie: z.boolean(),
            file: z.array(z.string()),
        }),
        languagesAvailable: z.array(z.string()),
        tags: z.array(z.string()),
        coverImage: z.string(),
        courseContent: z.array(
            z.object({
                isFreebie: z.boolean(),
                title: z.string(),
                description: z.string(),
                video: z.string(),
            })
        ),
    })
    .strict();

export type CourseToUpdate = z.infer<typeof CourseToUpdateSchema>;
