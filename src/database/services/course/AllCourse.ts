import { CourseModel } from "@/database/models/CourseModel";

export const GetAllCourses = async () => {
    const courses = await CourseModel.find();

    if (courses.length !== 0)
        return {
            success: true,
            message: "Courses made by author!",
            courses,
        };

    return {
        success: false,
        message: "Couldn't find courses!",
        courses: [],
    };
};
