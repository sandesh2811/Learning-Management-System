import { CourseModel } from "@/database/models/CourseModel";

export const CheckCourseExists = async (courseId: string) => {
    const course = await CourseModel.findById(courseId);

    if (!course)
        return {
            success: false,
            message: "Couldn't find particular course!",
        };

    return {
        success: true,
        message: "Course exists!",
    };
};

export const DeleteCourse = async (courseId: string) => {
    const { acknowledged } = await CourseModel.deleteOne({ _id: courseId });

    return acknowledged;
};
