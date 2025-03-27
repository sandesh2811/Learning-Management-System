import { CourseModel } from "@/database/models/CourseModel";

export const GetCoursesCreatedByAuthor = async (authorId: string) => {
    const coursesCreatedByAuthor = await CourseModel.find({ authorId });

    if (coursesCreatedByAuthor.length !== 0)
        return {
            success: true,
            message: "Courses made by author!",
            coursesCreatedByAuthor,
        };

    return {
        success: false,
        message: "Couldn't find courses!",
        coursesCreatedByAuthor: [],
    };
};
