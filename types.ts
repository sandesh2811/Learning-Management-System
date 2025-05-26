import { Connection } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

declare global {
    /* MONGO DB */

    // eslint-disable-next-line no-var
    var mongoose: {
        Types: any;
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };

    /* BACKEND TYPES */

    type BaseResponse = {
        success: boolean;
        message: string;
    };

    type ResponseStructure<T> = {
        error?: unknown;
        data?: T;
        nextPage?: {
            price: number;
            id: number;
        };
    } & BaseResponse;

    type LoginRouteBodyType = Omit<
        RegisterUserType,
        "email" | "role" | "avatar"
    >;

    type ParamsProp<T> = {
        params: Promise<T>;
    };

    type Pipeline = {
        $match: SearchParamsType;
    };

    // For middlewares
    type AppMiddleware = (req: NextRequest) => Promise<NextResponse | void>;

    /* SHARED TYPES */

    type SearchParamsType = {
        search?: string;
        type?: string;
        price?: string;
        duration?: string;
        language?: string;
        pageCursor?: undefined | string;
        priceCursor?: undefined | string;
    };

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

    type ReturnState = {
        success: boolean;
        message: string;
        userInfo?: LoggedInUserType;
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

    type SelectedFilters = {
        type: string;
        price: string;
        duration: string;
        language: string;
    };

    interface PageProps {
        searchParams: Promise<SearchParamsType>;
    }
}
