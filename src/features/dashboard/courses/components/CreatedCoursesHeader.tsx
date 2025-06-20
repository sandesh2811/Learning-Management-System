import Link from "next/link";

const CreatedCourseHeader = ({ username }: { username: string }) => {
    return (
        <div className="flex justify-between">
            <h3 className="mid:text-2xl text-lg font-semibold">Your Courses</h3>

            <Link
                className="mid:text-base bg-primary-text text-background flex cursor-pointer items-center justify-center gap-2 rounded-sm p-3 text-xs font-medium tracking-wide"
                href={`/dashboard/createCourse/${username}`}
            >
                Create Course
            </Link>
        </div>
    );
};

export default CreatedCourseHeader;
