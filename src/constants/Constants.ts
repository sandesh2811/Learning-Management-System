/* Status Codes */

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_MODIFIED = 309;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;
const SERVICE_UNAVAILABLE = 503;

/* Response Messages */

const INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error!";

/* Exports */

export {
    OK,
    CREATED,
    NO_CONTENT,
    NOT_MODIFIED,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    CONFLICT,
    INTERNAL_SERVER_ERROR,
    SERVICE_UNAVAILABLE,
    INTERNAL_SERVER_ERROR_MESSAGE,
};

/* NAVBAR LINKS */

export const Links = [
    {
        href: "/",
        title: "Home",
    },
    {
        href: "/courses",
        title: "Courses",
    },

    {
        href: "/register",
        title: "Register",
    },
    {
        href: "/login",
        title: "Login",
    },
];
