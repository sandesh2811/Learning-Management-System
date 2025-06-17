import { discountSchema } from "@/features/allcourses/schemas/incomingCourseSchema";

import { z } from "zod";

/* COURSE INSTRUCTOR */

const instructorInfoSchema = z.object({
    fullname: z.string(),
    email: z.string(),
    avatar: z.string(),
    about: z.string(),
});

export type CourseInstructorType = z.infer<typeof instructorInfoSchema>;

/* SINGLE COURSE */

const freebiesSchema = z.object({
    isFreebie: z.boolean(),
    file: z.array(z.string()),
});

const courseContent = z.object({
    isFreebie: z.boolean(),
    title: z.string(),
    description: z.string(),
    video: z.string(),
});

// Need to remove freebies schema
export const SingleCourseSchema = z
    .object({
        _id: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        duration: z.string(),
        discount: discountSchema,
        freebies: freebiesSchema,
        languagesAvailable: z.array(z.string()),
        enrolledStudents: z.array(z.string()),
        rating: z.number(),
        instructorInfo: instructorInfoSchema,

        courseContent: z.array(courseContent),
    })
    .strict();

export type SingleCourseType = z.infer<typeof SingleCourseSchema>;

/* RELATED COURSES */

const RelatedCourse = z
    .object({
        _id: z.string(),
        title: z.string(),
    })
    .strict();

export const RelatedCoursesSchema = z.array(RelatedCourse);

export type RelatedCoursesType = z.infer<typeof RelatedCoursesSchema>;
