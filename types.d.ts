/* BACKEND TYPES */

type ResponseStructure<T> = {
    success: boolean;
    message: string;
    error?: unknown;
    data?: T;
};

type RegisterRouteBodyType = {
    fullname: string;
    username: string;
    email: string;
    password: string;
    // avatar : string,
    role: string;
};

//todo : Omit avatar

type LoginRouteBodyType = Omit<RegisterRouteBodyType, "email" | "role">;

/* SHARED TYPES */

type LoggedInUserType = Omit<RegisterRouteBodyType, "password" | "email"> & {
    userId: string;
};

type CourseType = {
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
