import { UserSchemaType } from "@/database/models/UserModel";

/* For related course */

export type RelatedCourse = Pick<CourseType, "title">;

/* For single course */

export type SingleCourseWithAdditionalInfo = Omit<
    CourseType,
    "authorId" | "tags" | "coverImage" | "courseContent"
> &
    Omit<UserSchemaType, "password" | "username"> & {
        courseContent: {
            test: string;
        };
    };

/* For DB service return type */

export type CheckCourseExistsType = {
    data:
        | {
              course: SingleCourseWithAdditionalInfo;
              relatedCourses: RelatedCourse[];
          }
        | undefined;
} & BaseResponse;

/* For cache as well as API response*/

export type CacheDataType = {
    course: SingleCourseWithAdditionalInfo;
    relatedCourses: RelatedCourse[];
};
