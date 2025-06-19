const CreatedCoursesLoading = () => {
    return (
        <div className="flex grid-cols-2 flex-wrap items-center justify-between gap-6 md:grid">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div
                    key={idx}
                    className="border-primary-text/20 shadow-primary-text/5 flex min-h-[20vh] w-full flex-col gap-4 rounded-sm border-[1.2px] p-6 shadow-xl xl:max-w-[640px]"
                >
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <span className="bg-primary-text/20 mid:w-[270px] h-[20px] w-[180px] animate-pulse rounded-sm lg:w-[300px]" />
                            <span className="bg-primary-text/20 mid:w-[200px] h-[15px] w-[150px] animate-pulse rounded-sm lg:w-[200px]" />
                            <span className="bg-primary-text/20 mid:w-[150px] h-[15px] w-[100px] animate-pulse rounded-sm lg:w-[150px]" />
                            <span className="bg-primary-text/20 mid:w-[150px] h-[15px] w-[100px] animate-pulse rounded-sm lg:w-[150px]" />
                            <span className="bg-primary-text/20 mid:w-[200px] h-[15px] w-[120px] animate-pulse rounded-sm lg:w-[180px]" />
                        </div>

                        <span className="bg-primary-text/20 size-7 animate-pulse rounded-full" />
                    </div>

                    <span className="bg-primary-text/20 h-[35px] w-full animate-pulse rounded-sm" />
                </div>
            ))}
        </div>
    );
};

export default CreatedCoursesLoading;
