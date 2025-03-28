import { CourseModel } from "@/database/models/CourseModel";

export const EnrolledCourses = async (studentId: string) => {
    const courses = await CourseModel.find({
        enrolledStudents: { $in: { studentId } },
    });

    if (!courses)
        return {
            success: false,
            message: "Couldn't find any courses enrolled by student!",
        };

    return {
        success: true,
        message: "Courses enrolled by student!",
        courses,
    };
};
