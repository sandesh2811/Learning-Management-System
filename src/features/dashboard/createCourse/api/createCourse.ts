"use server";

import { CreateCourseSchemaType } from "../schemas/CreateCourseSchema";

export const createdCourse = async (
    _: unknown,
    data: CreateCourseSchemaType
) => {
    console.log(data);
};
