import { CourseModel } from "@/database/models/CourseModel";

export const DeleteCourse = async (courseId: string) => {
    const { acknowledged } = await CourseModel.deleteOne({ _id: courseId });

    return acknowledged;
};
