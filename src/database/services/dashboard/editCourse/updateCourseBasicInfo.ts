import { CourseModel, CourseSchemaType } from "@/database/models/CourseModel";

import { type BasicInfoUpdateType } from "@/features/dashboard/editCourse/schemas/basicInfoUpdateScehma";

/*
    Get the course id and data to be updated 
    Find the course based on course id and update
    If course updation successful then return the updated course
    Else return null
*/

type UpdateCourseBasicInfoArgs = {
    courseId: string;
    dataToBeUpdated: Partial<BasicInfoUpdateType>;
};

export const updateCourseBasicInfo = async ({
    courseId,
    dataToBeUpdated,
}: UpdateCourseBasicInfoArgs): Promise<CourseSchemaType | null> => {
    const updatedCourseInfo = await CourseModel.findByIdAndUpdate(
        { _id: courseId },
        { $set: dataToBeUpdated },
        { new: true }
    );

    if (!updatedCourseInfo) return null;

    return updatedCourseInfo;
};
