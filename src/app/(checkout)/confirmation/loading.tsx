const loading = () => {
    return (
        <div className="mid:bg-background mid:w-[500px] mid:p-6 flex w-full flex-col gap-7 rounded-md md:w-[600px] md:p-8">
            <span className="bg-primary-text/20 h-[25px] w-[250px] animate-pulse rounded-sm" />
            <div className="flex flex-col gap-4">
                <span className="bg-primary-text/20 h-[20px] w-[150px] animate-pulse rounded-sm" />
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <span
                            key={idx}
                            className="bg-primary-text/20 h-[15px] w-[250px] animate-pulse rounded-sm"
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <span className="bg-primary-text/20 h-[20px] w-[150px] animate-pulse rounded-sm" />
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <span
                            key={idx}
                            className="bg-primary-text/20 h-[15px] w-[250px] animate-pulse rounded-sm"
                        />
                    ))}
                </div>
            </div>
            <span className="bg-primary-text/20 h-[45px] w-full animate-pulse rounded-sm" />
            <div className="flex flex-col gap-2">
                <span className="bg-primary-text/20 h-[10px] w-full animate-pulse rounded-sm" />
                <span className="bg-primary-text/20 h-[10px] w-[150px] animate-pulse rounded-sm" />
            </div>
        </div>
    );
};

export default loading;
