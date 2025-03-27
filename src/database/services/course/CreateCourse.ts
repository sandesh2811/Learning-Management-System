import { CourseModel } from "@/database/models/CourseModel";

export const CreateCourse = async (
    courseCreationValidData: Omit<
        CourseType,
        "courseContent" | "enrolledStudents" | "_id"
    >
) => {
    const {
        authorId,
        title,
        description,
        discount,
        duration,
        freebies,
        languagesAvailable,
        price,
        tags,
    } = courseCreationValidData;

    const createdCourse = await CourseModel.create({
        authorId,
        title,
        description,
        discount,
        duration,
        freebies,
        languagesAvailable,
        price,
        tags,
    });

    if (createdCourse)
        return { success: true, message: "Course created successfully!" };

    return { success: false, message: "Couldn't create course!" };
};
