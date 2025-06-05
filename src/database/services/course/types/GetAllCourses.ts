/* For service as well as API response*/

export type SelectiveCourseDetails = Pick<
    CourseType,
    "title" | "price" | "coverImage" | "rating" | "discount" | "tags"
> & {
    courseswithuserinfo: {
        fullname: string;
    };
};

/* For DB service return type */

export type GetAllCoursesReturnType = {
    nextCursor?: {
        price: number;
        id: number;
    };
    courses: SelectiveCourseDetails[];
} & BaseResponse;

/* For Cache */

export type CacheDataType = Omit<
    GetAllCoursesReturnType,
    "success" | "message"
>;
