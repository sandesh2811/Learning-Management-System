import { z } from "zod";

import CreateCourseSchema from "../../createCourse/schemas/CreateCourseSchema";

export const BasicInfoUpdateSchema = CreateCourseSchema.omit({
    courseContent: true,
    courseThumbnail: true,
});

export type BasicInfoUpdateType = z.infer<typeof BasicInfoUpdateSchema>;
