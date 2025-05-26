/* STATUS CODES */

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_MODIFIED = 309;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const TOO_MANY_REQUESTS = 429;
const INTERNAL_SERVER_ERROR = 500;
const SERVICE_UNAVAILABLE = 503;

/* RESPONSE MESSAGES */

const INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error!";

const TOO_MANY_REQUESTS_MESSAGE = "Too many requests!";

/* NAVBAR LINKS */

const Links = [
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

/* COURSE FILTERS */

const CourseType = [
    "Frontend",
    "Backend",
    "Devops",
    "Fullstack",
    "UI/UX",
    "Video Editing",
    "Graphics Designing",
    "AI/ML",
];

const CoursePrice = ["Low to High", "High to Low"];

const CourseDuration = ["1", "2", "3", "4", "5", "6"];

const CourseLanguages = ["English", "Nepali", "Hindi"];

/* EXPORTS */

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
    TOO_MANY_REQUESTS,
    INTERNAL_SERVER_ERROR,
    SERVICE_UNAVAILABLE,
    INTERNAL_SERVER_ERROR_MESSAGE,
    TOO_MANY_REQUESTS_MESSAGE,
    Links,
    CourseType,
    CoursePrice,
    CourseDuration,
    CourseLanguages,
};

/* COURSES LIMIT */

export const LIMIT = 6;
