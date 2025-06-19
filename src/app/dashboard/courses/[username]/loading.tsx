import CreatedCoursesLoading from "@/features/dashboard/courses/components/CreatedCoursesLoading";

const loading = () => {
    return (
        <div className="flex flex-col gap-8">
            <CreatedCourseHeaderLoading />
            <CreatedCoursesLoading />
        </div>
    );
};

export default loading;

const CreatedCourseHeaderLoading = () => {
    return (
        <div className="flex justify-between">
            <span className="bg-primary-text/20 mid:w-[150px] h-[30px] w-[120px] animate-pulse rounded-sm" />
            <span className="bg-primary-text/20 mid:w-[150px] h-[40px] w-[110px] animate-pulse rounded-sm" />
        </div>
    );
};
