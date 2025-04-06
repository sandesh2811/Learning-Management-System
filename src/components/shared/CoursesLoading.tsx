const CoursesLoading = ({ length }: { length: number }) => {
    return (
        <div className="flex flex-wrap justify-center gap-6 md:grid md:grid-cols-2 md:justify-start lg:grid-cols-3 xl:gap-9">
            {Array.from({ length }).map((_, idx) => (
                <div
                    key={idx}
                    className="bg-secondary-background relative flex min-h-[50vh] w-[400px] flex-col overflow-hidden rounded-xl md:w-full"
                >
                    {/* Image */}
                    <div className="flex-1 animate-pulse bg-gray-300"></div>

                    <div className="flex flex-1 flex-col justify-between gap-6 p-4">
                        {/* Title and subtitle */}

                        <div className="flex flex-col gap-4">
                            <h3 className="h-[25px] w-1/2 animate-pulse rounded-xs bg-gray-300"></h3>

                            <div className="flex flex-col gap-1">
                                <p className="h-[15px] w-full animate-pulse rounded-xs bg-gray-300"></p>
                                <p className="h-[15px] w-full animate-pulse rounded-xs bg-gray-300"></p>
                                <p className="h-[15px] w-full animate-pulse rounded-xs bg-gray-300"></p>
                            </div>
                        </div>

                        {/* Mentor and course price */}

                        <div className="flex justify-between">
                            <span className="h-[25px] w-1/3 animate-pulse rounded-xs bg-gray-300"></span>
                            <span className="h-[25px] w-1/4 animate-pulse rounded-xs bg-gray-300"></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesLoading;
