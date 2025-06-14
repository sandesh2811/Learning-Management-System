import z from "zod";

const PurchasedCourseSchema = z.object({
    _id: z.string(),
    title: z.string(),
});

const UserEnrolledCourseDataSchema = z
    .object({
        createdAt: z.string(),
        course: PurchasedCourseSchema,
    })
    .strict();

export const UserEnrolledCoursesDataSchema = z.array(
    UserEnrolledCourseDataSchema
);

export type UserEnrolledCourseDataType = z.infer<
    typeof UserEnrolledCourseDataSchema
>;
