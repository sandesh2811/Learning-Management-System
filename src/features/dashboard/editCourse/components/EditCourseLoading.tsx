const EditCourseLoading = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* HEADINGS LOADER*/}

            <div className="bg-secondary-background flex w-full justify-between gap-6 rounded-sm p-2">
                <span className="bg-primary-text/10 h-[35px] w-[50%] animate-pulse rounded-sm" />
                <span className="bg-primary-text/10 h-[35px] w-[50%] animate-pulse rounded-sm" />
            </div>

            {/* FORM LOADER*/}

            <div className="bg-secondary-background min-h-[60vh] rounded-md p-4">
                <div className="bg-background flex h-full flex-col gap-8 rounded-sm p-6">
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

                    <div className="flex flex-col gap-8 md:flex-row">
                        {/* LANGUAGES AVAILABLE */}
                        <div className="flex flex-1 flex-col gap-4">
                            <span className="bg-secondary-background mid:h-[25px] mid:w-[180px] h-[20px] w-[100px] animate-pulse rounded-sm" />
                            <div className="flex gap-4">
                                {Array.from({ length: 2 }).map((_, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-secondary-background mid:h-[35px] h-[25px] w-full animate-pulse rounded-sm"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* COURSE TAGS */}
                        <div className="flex flex-1 flex-col gap-4">
                            <span className="bg-secondary-background h-[25px] w-[180px] animate-pulse rounded-sm" />
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-secondary-background h-[35px] w-[80px] animate-pulse rounded-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COURSE DESCRIPTION */}
                    <div className="flex flex-col gap-4">
                        <span className="bg-secondary-background h-[25px] w-[180px] animate-pulse rounded-sm" />
                        <span className="bg-secondary-background h-[60px] w-full animate-pulse rounded-sm" />
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="flex justify-end gap-4">
                        <span className="bg-secondary-background h-[40px] w-[150px] animate-pulse rounded-sm" />
                        <span className="bg-secondary-background h-[40px] w-[150px] animate-pulse rounded-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCourseLoading;
