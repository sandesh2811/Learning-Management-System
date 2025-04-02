import { Connection } from "mongoose";

declare global {
    /* MONGO DB */

    // eslint-disable-next-line no-var
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };

    /* BACKEND TYPES */

    type ResponseStructure<T> = {
        success: boolean;
        message: string;
        error?: unknown;
        data?: T;
    };

    type LoginRouteBodyType = Omit<
        RegisterUserType,
        "email" | "role" | "avatar"
    >;

    type ParamsProp<T> = {
        params: Promise<T>;
    };

    /* SHARED TYPES */

    type RegisterUserType = {
        fullname: string;
        username: string;
        email: string;
        password: string;
        avatar: File;
        role: string;
    };

    type LoggedInUserType = Omit<
        RegisterUserType,
        "password" | "email" | "avatar"
    > & {
        userId: string;
    };

    type CourseType = {
        _id: string;
        authorId: string;
        title: string;
        description: string;
        price: number;
        duration: number | string;
        discount: {
            hasDiscount: boolean;
            discountPercentage: number;
        };
        courseContent: string[];
        freebies: {
            isFreebie: boolean;
            file: File;
        };
        languagesAvailable: string | string[];
        enrolledStudents: string[];
        tags: string[];
    };
}
