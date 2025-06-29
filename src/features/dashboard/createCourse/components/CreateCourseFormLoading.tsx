const CreateCourseFormLoading = () => {
    return (
        <div className="border-primary-text/20 shadow-primary-text/5 flex min-h-[70vh] flex-col justify-between gap-8 rounded-md border-[1.2px] p-8 shadow-xl">
            <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2">
                <div className="flex w-full flex-col gap-4">
                    <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                    <span className="bg-secondary-background mid:h-[35px] h-[25px] w-full animate-pulse rounded-sm" />
                </div>

                <div className="flex w-full flex-col gap-4">
                    <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                    <span className="bg-secondary-background mid:h-[35px] h-[25px] w-full animate-pulse rounded-sm" />
                </div>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2">
                <div className="flex w-full flex-col gap-4">
                    <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                    <span className="bg-secondary-background mid:h-[35px] h-[25px] w-full animate-pulse rounded-sm" />
                </div>

                <div className="flex h-full w-full items-center gap-8">
                    <div className="flex h-full w-full flex-col gap-1">
                        <div className="flex w-full flex-col gap-4">
                            <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                            <span className="bg-secondary-background mid:h-[35px] h-[25px] w-full animate-pulse rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2">
                <div className="flex w-full flex-col gap-4">
                    <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                    <span className="bg-secondary-background mid:h-[35px] h-[25px] w-full animate-pulse rounded-sm" />
                </div>

                <div className="flex h-full w-full items-center gap-8">
                    <div className="flex h-full w-full flex-col gap-1">
                        <div className="flex w-full flex-col gap-4">
                            <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                            <span className="bg-secondary-background mid:h-[35px] h-[25px] w-full animate-pulse rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {/* LANGUAGES AVAILABLE */}
                <div className="flex flex-1 flex-col gap-4">
                    <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                    <div className="flex gap-4">
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <span
                                key={idx}
                                className="bg-secondary-background mid:h-[35px] h-[30px] w-[80px] animate-pulse rounded-sm"
                            />
                        ))}
                    </div>
                </div>

                {/* COURSE TAGS */}
                <div className="flex flex-1 flex-col gap-4">
                    <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                                key={idx}
                                className="bg-secondary-background mid:h-[35px] h-[30px] w-[80px] animate-pulse rounded-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* COURSE DESCRIPTION */}

            <div className="flex w-full flex-col gap-4">
                <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                <span className="bg-secondary-background mid:h-[80px] h-[40px] w-full animate-pulse rounded-sm" />
            </div>

            {/* CTA BUTTONS */}
            <div className="flex justify-end gap-4">
                <span className="bg-secondary-background h-[40px] w-[150px] animate-pulse rounded-sm" />
                <span className="bg-secondary-background h-[40px] w-[150px] animate-pulse rounded-sm" />
            </div>
        </div>
    );
};

export default CreateCourseFormLoading;
