import { z } from "zod";

const UserCreatedCourseSchema = z
    .object({
        _id: z.string(),
        title: z.string(),
        duration: z.string(),
        rating: z.number(),
        createdAt: z.string(),
        enrolledStudentsCount: z.number(),
    })
    .strict();

export const UserCreatedCoursesSchema = z.array(UserCreatedCourseSchema);

export type UserCreatedCoursesType = z.infer<typeof UserCreatedCoursesSchema>;
