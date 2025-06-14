import React from "react";

const EnrollFormLoading = () => {
    return (
        <div className="bg-secondary-background flex min-h-[55vh] w-full flex-col justify-center gap-4 rounded-md md:items-center">
            <div className="md:bg-background/70 flex h-full flex-col gap-8 rounded-md md:min-h-[45vh] md:w-[550px] md:p-6">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                        <span className="bg-primary-text/20 mid:w-[200px] h-[20px] w-[150px] animate-pulse rounded-sm" />

                        <p className="bg-primary-text/20 mid:w-[230px] h-[20px] w-[200px] animate-pulse rounded-sm" />
                    </div>
                </div>
                {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                        <span className="bg-primary-text/20 h-[25px] w-[150px] animate-pulse rounded-sm" />
                        <span className="bg-primary-text/20 h-[25px] w-full animate-pulse rounded-sm" />
                    </div>
                ))}

                <span className="bg-primary-text/20 h-[35px] w-full animate-pulse rounded-sm" />
            </div>
        </div>
    );
};

export default EnrollFormLoading;
