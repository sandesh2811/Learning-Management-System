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

/* USER BASED LINKS FOR NAVBAR */

const USER_BASED_LINKS = [
    {
        title: "Profile",
        href: "/user/profile",
    },
    { title: "Messages", href: "/user/messages" },
    { title: "Purchased Courses", href: "/user/purchased-courses" },
    { title: "Dashboard", href: "/dashboard" },
    { title: "Logout" },
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

/* TABLE HEADINS FOR USER ENROLLED COURSES */

const TABLE_HEADINGS = ["Course Name", "Purchased Date", "Progress", ""];

/* TAGS THAT ARE NEEDED TO BE EXCLUDED WHEN USING REACT PORTALS */

const TAGS_TO_BE_EXCLUDED = [
    "SCRIPT",
    "STYLE",
    "NEXTJS-PORTAL",
    "NEXT-ROUTE-ANNOUNCER",
];

/* COURSES LIMIT */

const LIMIT = 6;

/* REDIS CACHE */

const CACHE_TTLS = {
    COURSES: 60 * 10,
    FEATURED_COURSES: 60 * 15,
    SINGLE_COURSE: 60 * 15,
    ENROLLED_COURSES: 60 * 5,
    CREATED_COURSES_BY_AUTHOR: 60 * 10,
};

const CACHE_KEYS = {
    COURSES: "courses",
    FEATURED_COURSES: "featuredCourses",
    SINGLE_COURSE: "singleCourse",
    ENROLLED_COURSES: "enrolledCourses",
    CREATED_COURSES_BY_AUTHOR: "createdCourses",
};

/* DASHBOARD NAVBAR LINKS */

const DASHBOARD_LINKS = [
    {
        title: "Profile",
        href: "/dashboard/profile",
    },
    {
        title: "Messages",
        href: "/dashboard/messages",
    },
    {
        title: "Notifications",
        href: "/dashboard/notifications",
    },
    {
        title: "Courses",
        href: "/dashboard/courses",
    },
    {
        title: "Logout",
    },
];

/* CREATE COURSE */

const COURSE_TAGS = [
    "Frontend",
    "Backend",
    "Fullstack",
    "Devops",
    "UI/UX",
    "Java",
    "React",
    "Nodejs",
    "Nestjs",
    "Nextjs",
];

const LANGUAGES_AVAILABLE = ["English", "Nepali"];

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
    LIMIT,
    CACHE_KEYS,
    CACHE_TTLS,
    TAGS_TO_BE_EXCLUDED,
    USER_BASED_LINKS,
    TABLE_HEADINGS,
    DASHBOARD_LINKS,
    COURSE_TAGS,
    LANGUAGES_AVAILABLE,
};
