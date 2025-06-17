import z from "zod";

const CourseContentSchema = z
    .object({
        _id: z.string(),
        title: z.string(),
        description: z.string(),
        video: z.string(),
    })
    .strict();

export const SelectedCourseContentSchema = z.array(CourseContentSchema);

export type SelectedCourseContentType = z.infer<
    typeof SelectedCourseContentSchema
>;
