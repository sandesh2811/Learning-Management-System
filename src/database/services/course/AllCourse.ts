import { CourseModel, CourseSchemaType } from "@/database/models/CourseModel";

export const GetAllCourses = async (): Promise<CourseSchemaType[]> => {
    const courses = await CourseModel.find();

    return courses;
};
