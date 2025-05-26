const CoursesLoading = ({ length }: { length: number }) => {
    return (
        <div
            data-testid="courses-loader"
            className="grid place-items-center gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
            {Array.from({ length }).map((_, idx) => (
                <div
                    key={idx}
                    className="bg-secondary-background relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl md:max-w-[500px]"
                >
                    <div className="flex h-full flex-col items-center justify-center">
                        {/* Image */}
                        <ImageSkeleton />

                        <div className="flex h-40 w-full items-center px-4">
                            <div className="bg-background flex w-full animate-pulse flex-col justify-between gap-6 rounded-lg p-4">
                                {/* Title and subtitle */}
                                <TitleAndSubtitleSkeleton />

                                {/* Mentor and course price */}
                                <CoursePriceAndMentorSkeleton />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesLoading;

const ImageSkeleton = () => {
    return <div className="bg-primary-text/20 h-[23vh] w-full animate-pulse" />;
};

const TitleAndSubtitleSkeleton = () => {
    return (
        <div className="flex justify-between gap-1">
            <h3 className="bg-primary-text/20 h-5 w-1/2 animate-pulse rounded-xs" />

            <span className="bg-primary-text/20 h-5 w-10 gap-1 rounded-xs" />
        </div>
    );
};

const CoursePriceAndMentorSkeleton = () => {
    return (
        <div className="flex justify-between">
            <span className="bg-primary-text/20 h-5 w-1/3 animate-pulse rounded-xs" />
            <span className="bg-primary-text/20 h-5 w-1/4 animate-pulse rounded-xs" />
        </div>
    );
};
