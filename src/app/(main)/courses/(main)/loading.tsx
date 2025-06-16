import CoursesLoading from "@/components/shared/course/CoursesLoading";

const loading = () => {
    return (
        <div className="flex min-h-[80vh] flex-col gap-10">
            <FiltersSkeleton />
            <CoursesLoading length={6} />
            <ButtonSkeleton />
        </div>
    );
};

export default loading;

const FiltersSkeleton = () => {
    return (
        <div className="mid:flex-row flex flex-col items-center justify-between gap-4">
            <div className="mid:max-w-[200px] bg-primary-text/20 relative w-full max-w-[400px] animate-pulse rounded-sm px-4 py-5"></div>
            <div className="mid:max-w-[200px] bg-primary-text/20 relative w-full max-w-[4000px] animate-pulse rounded-sm px-3 py-5"></div>
        </div>
    );
};

const ButtonSkeleton = () => {
    return (
        <div className="flex justify-center">
            <div className="bg-primary-text/20 h-[45px] w-[100px] rounded-sm"></div>
        </div>
    );
};
