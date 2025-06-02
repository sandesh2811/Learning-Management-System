const SingleCourseLoading = () => {
    return (
        <div className="flex min-h-[50vh] w-full flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <BasicCourseDetailsLoading />
                <ReasonsToBuyLoading />
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
                <CourseContentContainerLoading />
                <CourseInstructorInfoLoading />
            </div>
        </div>
    );
};

export default SingleCourseLoading;

const BasicCourseDetailsLoading = () => {
    return (
        <div className="bg-secondary-background flex min-h-[30vh] flex-1/5 flex-col justify-between gap-8 rounded-xl p-6">
            <div className="flex flex-col gap-4">
                <span className="bg-primary-text/20 mid:w-[350px] h-[20px] animate-pulse rounded-sm" />
                <div className="flex flex-col gap-3">
                    <p className="bg-primary-text/20 mid:w-[650px] h-[16px] w-[220px] animate-pulse rounded-sm md:w-[300px]" />
                    <p className="bg-primary-text/20 mid:w-[550px] h-[16px] w-[200px] animate-pulse rounded-sm md:w-[300px]" />
                    <p className="bg-primary-text/20 h-[16px] w-[200px] animate-pulse rounded-sm" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {/* PRICE AND RATING */}
                <div className="flex items-center justify-between">
                    <span className="bg-primary-text/20 mid:w-[150px] h-[18px] w-[80px] animate-pulse rounded-sm" />
                    <span className="flex items-center gap-1">
                        <span className="bg-primary-text/20 mid:w-[150px] h-[18px] w-[80px] animate-pulse rounded-sm" />
                    </span>
                </div>

                {/* LANGUAGES AND DURATION */}
                <div className="mid:flex-row mid:items-center flex flex-col justify-between gap-2">
                    <span className="bg-primary-text/20 mid:w-[250px] h-[18px] w-[180px] animate-pulse rounded-sm md:w-[190px]" />
                    <span className="bg-primary-text/20 mid:w-[180px] h-[18px] w-[100px] animate-pulse rounded-sm md:w-[170px]" />
                </div>
            </div>
        </div>
    );
};

const ReasonsToBuyLoading = () => {
    return (
        <div className="bg-secondary-background flex flex-1 flex-col justify-between gap-4 rounded-xl p-6">
            <div className="flex flex-col gap-6">
                <span className="bg-primary-text/20 mid:w-[300px] h-[25px] w-[180px] animate-pulse rounded-sm md:w-[250px]" />

                <ul className="flex flex-col gap-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <li
                            className="bg-primary-text/20 mid:w-[250px] h-[15px] w-[200px] animate-pulse rounded-sm md:w-[200px]"
                            key={idx}
                        />
                    ))}
                </ul>
            </div>

            <div className="mid:justify-end flex">
                <span className="bg-primary-text/20 mid:w-[160px] h-[40px] w-full animate-pulse rounded-sm md:w-[140px]" />
            </div>
        </div>
    );
};
const CourseContentContainerLoading = () => {
    return (
        <div className="bg-secondary-background relative overflow-hidden rounded-xl p-6 md:flex-1/5 lg:flex-1/3">
            <div className="h-[50vh]">
                <span className="bg-primary-text/20 block h-[30px] w-[200px] animate-pulse rounded-sm" />
                <div className="h-full">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="mid:mr-4 relative cursor-pointer py-6 md:mr-6"
                        >
                            <div className="flex flex-col gap-2">
                                <span className="bg-primary-text/20 h-[35px] w-full animate-pulse rounded-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const CourseInstructorInfoLoading = () => {
    return (
        <div className="bg-secondary-background flex min-h-[50vh] flex-1 flex-col gap-6 rounded-xl p-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary-text/20 size-15 animate-pulse rounded-full" />
                    <div className="flex flex-col gap-2">
                        <span className="bg-primary-text/20 mid:w-[120px] h-[15px] w-[110px] animate-pulse rounded-sm" />
                        <span className="bg-primary-text/20 mid:w-[150px] h-[15px] w-[130px] animate-pulse rounded-sm" />
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="bg-primary-text/20 h-[15px] w-[100px] animate-pulse rounded-sm" />
                        <span className="bg-primary-text/20 mid:w-[350px] h-[15px] animate-pulse rounded-sm md:w-[250px]" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <span className="bg-primary-text/20 mid:w-[150px] h-[25px] w-[130px] animate-pulse rounded-sm" />
                        <div className="flex flex-col gap-6">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <span
                                    key={idx}
                                    className="bg-primary-text/20 mid:w-full h-[15px] animate-pulse rounded-sm py-4"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
