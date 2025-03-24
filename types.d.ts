/* BACKEND TYPES */

type ResponseStructure<T> = {
    success: boolean;
    message: string;
    error?: unknown;
    data?: T;
};

type RegisterRouteBodyType = {
    username: string;
    email: string;
    password: string;
    // avatar : string,
    role: string;
};

//todo : Omit avatar

type LoginRouteBodyType = Omit<RegisterRouteBodyType, "email" | "role">;

/* Shared */

type LoggedInUserType = Omit<RegisterRouteBodyType, "password" | "email"> & {
    userId: string;
};
